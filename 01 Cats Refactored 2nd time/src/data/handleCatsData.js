const {promises:fs}=require('fs');
const {IncomingForm}=require('formidable');
const { errorHandler } = require('../errorHandlers/errorHandler');
const path=require('path');

const endPoints={
    cats:'./src/data/cats.json',
    breeds:'./src/data/breeds.json',
    images:path.join('/content/images/'),
    directoryRoot:__dirname.replace('src/data','')

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
let allBreeds=JSON.parse(await fs.readFile(endPoints.breeds));
allBreeds.push(formData[0].breed);
try{
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
    console.log(generateId())
    await fs.rename(formData[1].upload.filepath,endPoints.directoryRoot+endPoints.images+formData[1].upload.newFilename+'.jpgHELLO')
let catsData = JSON.parse(await fs.readFile(endPoints.cats));

let newCat={
    
    "id":"awed-4056-bews-4033",
    "imageUrl":"https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
    "breed":"Bombay cat",
    "name":"Pretty Kitty",
    "description":"Cat with temperament and very nice behaviour. She is the ultimate hugging machine."


}

}
function generateId(){
    let firstNumber=Math.floor((Math.random()*10000)).toString().substring(0,4);
    let secondNumber=Math.floor((Math.random()*10000)).toString().substring(0,4);

    let firstString=String.fromCharCode(firstNumber[0]+firstNumber[1])+
    String.fromCharCode(firstNumber[0]+firstNumber[4])+
    String.fromCharCode(firstNumber[1]+firstNumber[2])+
    String.fromCharCode(firstNumber[2]+firstNumber[3])

    let secondString=String.fromCharCode(secondNumber[0]+secondNumber[1])+
    String.fromCharCode(secondNumber[0]+secondNumber[4])+
    String.fromCharCode(secondNumber[1]+secondNumber[2])+
    String.fromCharCode(secondNumber[2]+secondNumber[3])
    return `${firstString}-${firstNumber}-${secondString}-${secondNumber}`
}
module.exports={getListInfo,addNewBreed,addNewCat}