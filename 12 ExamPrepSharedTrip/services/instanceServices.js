const Instance = require("../models/Instance");


async function getAll(status){
    if(!status){
        let instances=await Instance.find({}).populate('enrolledUsers').populate('owner').lean();
        instances=instances.filter((instance)=>instance.status!='Closed')
        decorateArrayofInstances(instances);
        return instances
    }else{
        let instances=await Instance.find({status:status}).populate('enrolledUsers').populate('owner').lean();
        decorateArrayofInstances(instances);
        return instances
    }


}

async function getFirstElementstAll(numberOfElements,status){
    if(!status){
        let instances=await Instance.find({}).populate('enrolledUsers').populate('owner').lean();
        decorateArrayofInstances(instances);
        instances=instances.sort((a,b)=>  new Date(b.createdAt) - new Date(a.createdAt));
        let result=[]
        for (let index = 0; index < numberOfElements; index++) {
            const element = instances[index];
            if (element){
                result.push(element)
            }
            
        }
        return result  
    }else{
        let instances=await Instance.find({status:status}).populate('enrolledUsers').populate('owner').lean();
        decorateArrayofInstances(instances);
        instances=instances.sort((a,b)=>  new Date(a.createdAt) - new Date(b.createdAt));
        let result=[]
        for (let index = 0; index < numberOfElements; index++) {
            const element = instances[index];
            if (element){
                result.push(element)
            }
            
        }
        return result  
    }


}



/*async function getAllClosed(){
    
    let instances=await Instance.find({status:'Closed'}).populate('enrolledUsers').populate('owner').lean();
    decorateArrayofInstances(instances);
    return instances

}*/

async function create(instance){
    let result=await Instance.create(instance);
    return result
}

async function getById(id){
    try {
        let instance=await Instance.findById(id).populate('owner').populate('enrolledUsers').lean();
        decorateSingleInstance(instance);
        //let instance1=await Instance.findById(id).populate('owner').populate('enrolledUsers').lean();
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

async function closeById(id){
    
    
    let instance=await Instance.findById(id);
    instance.status='Closed';
    await instance.save()
    
    return instance
}

async function replaceById(req,instance){
    let dbInstance=await Instance.findById(req.params.id);
    Object.entries(instance).forEach((pair)=>dbInstance[pair[0]]=pair[1])
    await dbInstance.save()
  
}

function decorateArrayofInstances(instances){
    if(instances){
        instances.forEach((i)=>{
            decorateSingleInstance(i);
            i.instancesLength=instances.length;
        })
        
    }
    
}

function decorateSingleInstance(instance){
    if (instance){
        instance.lastEnrolledUser=instance.enrolledUsers[instance.enrolledUsers.length-1];
        instance.numberOfEnrolledUsers=instance.enrolledUsers.length;
        
        instance.allSeatsTaken=instance.numberOfEnrolledUsers>=instance.seats?true:false;
        instance.freeSeats=instance.seats-instance.numberOfEnrolledUsers;
        instance.enrolledUserMails=instance.enrolledUsers.map((user)=>user.email).join(', ');
    }
    
    
}

module.exports={getAll,create,getById,replaceById,deleteById,closeById,getFirstElementstAll}