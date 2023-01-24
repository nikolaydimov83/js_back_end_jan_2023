const {getById,replaceById}=require('../services/instanceServices');
const { enrollUser } = require('../services/userServices');
const { parseError, checkUserEnrolled } = require('../util/utils');

const enrollInstanceController=require('express').Router();

enrollInstanceController.get('/:id',async (req,res)=>{
    try {
        const instance=await getById(req.params.id);

        if(req.userData._id.toString()===instance.owner._id.toString()){
            let error= new Error('You are the owner of this instance. You cannot enroll your own instance!')
            error.instance=instance;
            error.user=req.userData.email;
            throw error
            
        }
      
        let userHasEnrolled = checkUserEnrolled(instance,req);

        if(userHasEnrolled){
            let error= new Error('You have already enrolled!')
            instance.hasEnrolled=true;
            error.instance=instance;
            error.user=req.userData.email;
            throw error
            
        }
        if (instance.allPiecesTaken){
            let error= new Error('No free pieces!')
            //instance.hasEnrolled=true;
            error.instance=instance;
            error.user=req.userData.email;
            throw error
        }
        /*if (req.body.newPrice<=instance.price||(typeof(Number(req.body.newPrice)) !== 'number')){
            let error= new Error('You should offer price that is higher than the current!')
            instance.newPrice=req.body.newPrice;
            error.instance=instance;
            error.user=req.userData.username;
            throw error
        }*/
        
        await enrollUser(req,instance);
        instance.enrolledUsers.push(req.userData._id);
        await replaceById(req,instance);
        res.redirect(`/details/${req.params.id}`);
        



        
    } catch (error) {
        let errors=parseError(error);
        const instance=error.instance;
        const user=error.user;
        //res.render('detailsInstance',{errors,instance,user});
        res.render(`detailsInstance`,{errors,instance,user});
    }


})
/*enrollInstanceController.get('/:id',async (req,res)=>{
    res.redirect(`/details/${req.params.id}`)
})*/
module.exports=enrollInstanceController