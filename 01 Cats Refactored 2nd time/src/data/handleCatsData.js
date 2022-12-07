const {promises:fs}=require('fs');
const {IncomingForm}=require('formidable');
const { errorHandler } = require('../errorHandlers/errorHandler');
const path=require('path');

const endPoints={
    cats:'./src/data/cats.json',
    breeds:'./src/data/breeds.json',
    images:path.join('/content/images/'),
    shelter:'./src/data/shelteredCats.json'
    //directoryRoot:__dirname.replace('src/data','').replace('src//data','')

}

async function getListInfo(infoType){
    return JSON.parse(await fs.readFile(endPoints[infoType],'utf8'));
}

async function addNewBreed(req,res){
let form = new IncomingForm();
let formData=await new Promise(function(resolve,reject){
    form.parse(req,(err,fields,files)=>{
        if(err){
            reject(err)
        }else{
            resolve([fields,files])
            
        }
    })
})
console.log(formData);
try{
let allBreeds=JSON.parse(await fs.readFile(endPoints.breeds));
allBreeds.push(formData[0].breed);

    await fs.writeFile(endPoints.breeds,JSON.stringify(allBreeds));
    res.writeHead(301,{"Location":"/"});
    res.end();
}catch(err){
    errorHandler(err);
}

}

async function addNewCat(req,res){
    let form = new IncomingForm();
    let formData=await new Promise(function(resolve,reject){
        form.parse(req,(err,fields,files)=>{
            if (err){
                reject(err)
            }else{
                resolve([fields,files]);
            }
        })
    });
    
    let newFileName = await processIncomingFile(formData);
let catsData = JSON.parse(await fs.readFile(endPoints.cats));

let newCat={
    
    "id":generateId(),
    "imageUrl":path.join(endPoints.images,newFileName),
    "breed":formData[0].breed,
    "name":formData[0].name,
    "description":formData[0].description


}
catsData.push(newCat);
await fs.writeFile(endPoints.cats,JSON.stringify(catsData));
res.writeHead(301,{"Location":"/"});
res.end();


}

async function deleteCat(req,res){
try {
    let allCats=await getListInfo("cats");
    let indexOfCatToEdit=allCats.findIndex((cat)=>cat.id===req.id);
    if(indexOfCatToEdit>-1){
        let shelteredCats=await getListInfo("shelter");
        shelteredCats.push(allCats[indexOfCatToEdit]);   
        allCats.splice(indexOfCatToEdit,1);
        await fs.writeFile(endPoints.cats,JSON.stringify(allCats));
        await fs.writeFile(endPoints.shelter,JSON.stringify(shelteredCats));
        res.writeHead(301,{"Location":"/"});
        res.end();
    }

} catch (error) {
    errorHandler(error);
}

}


async function search(req,res){
    let form=new IncomingForm();
    let formData=await (new Promise(function(resolve,reject){
        form.parse(req,(err,fields,files)=>{
            if(err){
                reject(err);
            }else{
                resolve([fields,files]);
            }
        });
    }));
    let foundCats=[]
    let allCatsArray=await getListInfo('cats');
    allCatsArray.forEach(cat => {
        let result=Math.max(cat.breed.toLowerCase().indexOf(formData[0]["search"].toLowerCase()),
        cat.name.toLowerCase().indexOf(formData[0]["search"].toLowerCase()),
        cat.id.toLowerCase().indexOf(formData[0]["search"].toLowerCase()),
        cat.description.toLowerCase().indexOf(formData[0]["search"].toLowerCase()))
        
        if (result>-1){
            foundCats.push(cat)
        }
    });
return foundCats
}

async function editCat(req,res){
    let form=new IncomingForm();
    let formData=await (new Promise(function(resolve,reject){
        form.parse(req,(err,fields,files)=>{
            if(err){
                reject(err);
            }else{
                resolve([fields,files]);
            }
        });
    }));
let allCats=await getListInfo("cats")

      
let indexOfCatToEdit=allCats.findIndex((cat)=>cat.id===req.id)

if(indexOfCatToEdit>-1){
    let newFileName =allCats[indexOfCatToEdit].imageUrl.replace(endPoints.images,'');
    
    if(formData[1].upload.size>0){

    newFileName= await processIncomingFile(formData,req);

    }

    let catToEdit={
        "id":allCats[indexOfCatToEdit].id,
        "imageUrl":path.join(endPoints.images,newFileName),
        "breed":formData[0].breed,
        "name":formData[0].name,
        "description":formData[0].description
    }
    console.log()
    allCats.splice(indexOfCatToEdit,1,catToEdit)
    await fs.writeFile(endPoints.cats,JSON.stringify(allCats));
    res.writeHead(301,{"Location":"/"});
    res.end();
}


}

function generateId(){
    let firstNumber=Math.floor((Math.random()*100000)).toString().substring(0,4);
    let secondNumber=Math.floor((Math.random()*100000)).toString().substring(0,4);

    function genCharCode(number){
        let result=Number(number[0])+Number(number[1])+Number(number[2])+Number(number[3]);
        if (result>17){
            result-=14
        }
        result+=100;
        return result
    }

    let firstString=String.fromCharCode(genCharCode(firstNumber))+
    String.fromCharCode(genCharCode(firstNumber)+1)+
    String.fromCharCode(genCharCode(firstNumber)+3)+
    String.fromCharCode(genCharCode(firstNumber)+5)

    let secondString=String.fromCharCode(genCharCode(secondNumber))+
    String.fromCharCode(genCharCode(secondNumber)+1)+
    String.fromCharCode(genCharCode(secondNumber)+2)+
    String.fromCharCode(genCharCode(secondNumber)+4)
    return `${firstString}-${firstNumber}-${secondString}-${secondNumber}`
}

async function processIncomingFile(formData,req) {
    try {
        let fileExtension = formData[1].upload.originalFilename.split('.')[formData[1].upload.originalFilename.split('.').length - 1];
        let newFileName = formData[1].upload.newFilename + `.${fileExtension}`;
        let newFilePath = path.join(req.globalPath, endPoints.images, newFileName);
        await fs.rename(formData[1].upload.filepath, newFilePath);
        return newFileName;
    } catch (error) {
        throw error
    }
}
module.exports={getListInfo,addNewBreed,addNewCat,editCat,deleteCat,search}