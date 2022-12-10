const {promises:fs}=require('fs');
const path=require('path');

const root=require('../endpoints');
let finalPath=path.join(root.endPoints.root,'/config/database.json')
console.log(finalPath)
async function readAllModels(){
    
    let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    
    return models
}

async function readModelById(id){
    
    let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    let model=models.find((model)=>model.id===id);
    return model
}

async function addModel(model){
    
    let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    model.id=Math.floor((Math.random()*10000000)).toString().substring(0,4);
    models.push(model);
    await fs.writeFile(path.join(root.endPoints.root,'/config/database.json'),JSON.stringify(models,null,2))

}

async function search(searchInfo){
    
    let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    let validSearchParams=[]
    let result={}
    Object.entries(searchInfo).forEach((entry)=>{
        if (entry[1]){
            if(entry[0]!=='search'&&isNaN(Number(entry[1]))){
                throw new Error('Minimum and maximum difficulty should be a number!')
            }
            validSearchParams.push(entry);
            //result[entry[0]]=[];
        }
    })
if (validSearchParams.length===0){
    return
}

/*if (validSearchParams[0]['to']){
    if (Number(validSearchParams['to'])===NaN){
        throw new Error ('Wrong value in maximum difficulty')
    }
}

if (validSearchParams[0]['from']){
    if (Number(validSearchParams['from'])===NaN){
        throw new Error ('Wrong value in minimum difficulty')
    }
}*/

validSearchParams.forEach((param)=>{
    let result1 = models.filter((model)=>{
        if (param[0]==='search'){
            if ((model.name.toLowerCase()).indexOf(param[1].toLowerCase())>-1||(model.details.toLowerCase()).indexOf(param[1].toLowerCase())>-1){
                return true
            }else{
                return false
            }
        }else if(param[0]=='from'){
            return Number(param[1])<=Number(model.diffLevel)
        }else if(param[0]=='to'){
            return Number(param[1])>=Number(model.diffLevel)
        }

        
});
result[param[0]]=result1;
});
let finalResult=[]
Object.values(result)[0].forEach((model)=>{
    let counter=1
    for (let i=1;i<Object.values(result).length;i++){
        Object.values(result)[i].forEach((model1)=>{
            if(model.id===model1.id){
                counter++
            }
        })
    }
    if(counter===Object.values(result).length){
        finalResult.push(model)
    }
})
return finalResult


}
module.exports={readAllModels,readModelById,addModel,search}