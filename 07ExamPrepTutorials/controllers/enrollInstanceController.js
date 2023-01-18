const {getById,replaceById}=require('../services/instanceServices');
const { enrollUser } = require('../services/userServices');
const { parseError } = require('../util/utils');

const enrollInstanceController=require('express').Router();

enrollInstanceController.get('/:id',async (req,res)=>{
    try {
        const instance=await getById(req.params.id);

        if(req.userData._id.toString()===instance.owner._id.toString()){
            let error= new Error('You are the owner of this instance. You cannot book room your own instance!')
            error.instance=instance;
            error.user=req.userData.username;
            throw error
            
        }
        let userHasEnrolled=instance.enrolledUsers.find((user)=>user._id.toString()===req.userData._id.toString())
        if(userHasEnrolled){
            let error= new Error('You have already booked!')
            instance.hasEnrolled=true;
            error.instance=instance;
            error.user=req.userData.username;
            throw error
            
        }

        
        instance.enrolledUsers.push(req.userData._id);
        await enrollUser(req,instance);
        await replaceById(req,instance);
        res.redirect(`/details/${req.params.id}`);


        
    } catch (error) {
        let errors=parseError(error);
        const instance=error.instance;
        const user=error.user;
        res.render('detailsInstance',{errors,instance,user});
    }
})

module.exports=enrollInstanceController