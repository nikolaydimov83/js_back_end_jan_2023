const {promises:fs}=require('fs');
const path=require('path');

const root=require('../endpoints');
const Cube = require('../models/Cube');
let finalPath=path.join(root.endPoints.root,'/config/database.json')
console.log(finalPath);

async function writeModelInDb(cube){
    await Cube.create(/*{
        name:'New Cube',
        description:'Try out the best Rubik Cube',
        imageUrl:"https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
        diffLevel:2
    }*/cube)
}
async function readAllModels(){
    
    //let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    let models=await Cube.find({}).lean();
    //models.id=models._id
    return models
}

async function readModelById(id){
    
    /*let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    let model=models.find((model)=>model.id===id);*/
    let model=await Cube.findById(id)
    return model
}

async function addModel(model){
    await Cube.create(model);
    /*let models= JSON.parse(await fs.readFile(path.join(root.endPoints.root,'/config/database.json'),'utf8'));
    model.id=Math.floor((Math.random()*10000000)).toString().substring(0,4);
    models.push(model);
    await fs.writeFile(path.join(root.endPoints.root,'/config/database.json'),JSON.stringify(models,null,2))*/


}

async function search(searchInfo){
    if (!searchInfo.from){
        searchInfo.from=0
    }

    if (!searchInfo.to){
        searchInfo.to=7
    }
    if(!searchInfo.search){
        searchInfo.search=''
    }
    let models=await Cube
                .find({$or:[{name:{"$regex":searchInfo.search,"$options": "i"}},
                    {description:{"$regex":searchInfo.search,"$options": "i"}}]})
                    .where('diffLevel').gte(searchInfo.from).where('diffLevel').lte(searchInfo.to);
          
           // .where('diffLevel').gte(searchInfo.from)
            //.where('diffLevel').lte(searchInfo.to)
return models

}
module.exports={readAllModels,readModelById,addModel,search, writeModelInDb}