const Accesoary = require('../models/Accesoary');
const Cube = require('../models/Cube');
const { readModelById } = require('./handleModelsData');

async function addAccesoary(body){
    await Accesoary.create(body)
}

async function getAllAccesories(){
    let accesoryList=await Accesoary.find({}).select('id name').lean();
    return accesoryList
}

async function getAccesoriesById(ids){
    let result=[]
    
    ids.forEach(async (id)=>{
        let r=await Accesoary.findById(id._id).lean()
        result.push(r);
    })
    return result
     
}

async function getEligibleAccesoariesById(cubeId){
    let cube=await readModelById(cubeId)//.accesoaries//.map((accesory)=>accesory._id);
    let cubeAccesoriesIds=[]
    if (cube.accesoaries.length>0){
        cubeAccesoriesIds=cube.accesoaries.map((accesory)=>accesory._id)
    }else{
        cubeAccesoriesIds=[''];
    }
    let eligibleAccsories=await Accesoary.find({ _id : { $nin: cubeAccesoriesIds }}).select('_id name');
    return eligibleAccsories

}

async function attachAccesoaryToCube(cubeId,formBody){
    let cube=await Cube.findById(cubeId);
    let accesory=await Accesoary.findById(formBody.accessory);
    cube.accesoaries.push(accesory);
    cube.save();
}

module.exports={addAccesoary,getAllAccesories,getEligibleAccesoariesById,attachAccesoaryToCube,getAccesoriesById}