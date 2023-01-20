const Instance = require("../models/Instance");
const { findUserById } = require("./userServices");

async function getAll(){
    
    let instances=await Instance.find({}).lean();

    return instances

}

async function create(instance){
    let result=await Instance.create(instance);
    return result
}

async function getById(id){
    try {
        let instance=await Instance.findById(id).populate('owner').lean();
        return instance 
    } catch (error) {
        if (error.kind=='ObjectId'){
            return null
        }else throw error
    }


    
   
}

async function deleteById(id){
    
    
    let instance=await Instance.findByIdAndDelete(id);
    
    return instance
}

async function replaceById(req,instance){
    await Instance.replaceOne({_id:req.params.id},instance)
}



module.exports={getAll,create,getById,replaceById,deleteById}