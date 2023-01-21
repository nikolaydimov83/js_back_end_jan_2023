const Instance = require("../models/Instance");


async function getAll(){
    
    let instances=await Instance.find({}).lean();
    instances=instances.filter((instance)=>instance.status!='Closed')

    return instances

}

async function getAllClosed(){
    
    let instances=await Instance.find({status:'Closed'}).populate('enrolledUsers').lean();
    

    instances.forEach((i)=>i.lastEnrolled=i.enrolledUsers[i.enrolledUsers.length-1])

    return instances

}

async function create(instance){
    let result=await Instance.create(instance);
    return result
}

async function getById(id){
    try {
        let instance=await Instance.findById(id).populate('owner').lean();
        let instance1=await Instance.findById(id).populate('owner').populate('enrolledUsers').lean();
        if(instance){
            instance.lastEnrolled=instance1.enrolledUsers[instance1.enrolledUsers.length-1];
            if (instance.status!='Closed'){
                return instance
            }
        }

        
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
async function closeById(id){
    
    
    let instance=await Instance.findById(id);
    instance.status='Closed';
    await instance.save()
    
    return instance
}

async function replaceById(req,instance){
    await Instance.replaceOne({_id:req.params.id},instance)
}



module.exports={getAll,create,getById,replaceById,deleteById,getAllClosed,closeById}