const { body } = require('express-validator');
const {getById,replaceById}=require('../services/instanceServices');
const { enrollUser } = require('../services/userServices');
const { parseError, checkUserEnrolled } = require('../util/utils');

const enrollInstanceController=require('express').Router();

enrollInstanceController.post('/:id',async (req,res)=>{
    try {
        const instance=await getById(req.params.id);

        if(req.userData._id.toString()===instance.owner._id.toString()){
            let error= new Error('You are the owner of this instance. You cannot enroll your own instance!')
            error.instance=instance;
            error.user=req.userData;
            throw error
            
        }
      
        let userHasEnrolled = checkUserEnrolled(instance,req);
        if(Number(req.body.newPrice)<=instance.price){
            let error= new Error('Offer better price!');
            error.instance=instance;
            error.user=req.userData.username;
            throw error

        }
        if(req.userData){
            if(instance.lastEnrolledUser){
                 instance.lastEnrolledIsCurrentUser=instance.lastEnrolledUser._id.toString()===req.userData._id.toString()?true:false
            }else{
                instance.lastEnrolledIsCurrentUser=false;
            }
           
        }else{
            instance.lastEnrolledIsCurrentUser=false;
        }
        /*if(userHasEnrolled){
            let error= new Error('You have already enrolled!')
            instance.hasEnrolled=true;
            error.instance=instance;
            error.user=req.userData.email;
            throw error
            
        }*/
        if (instance.allPiecesTaken){
            let error= new Error('No free pieces!')
            //instance.hasEnrolled=true;
            error.instance=instance;
            error.user=req.userData.email;
            throw error
        }
        if (req.body.newPrice<=instance.price||(typeof(Number(req.body.newPrice)) !== 'number')){
            let error= new Error('You should offer price that is higher than the current!')
            instance.newPrice=req.body.newPrice;
            error.instance=instance;
            error.user=req.userData.username;
            throw error
        }

        
        await enrollUser(req,instance);
        instance.enrolledUsers.push(req.userData._id);
        instance.price=req.body.newPrice;
        /*if (req.params.voteType=='upvote'){
            instance.rating++
        }else if (req.params.voteType=='downvote') {
            instance.rating--
        }else{
            throw new Error('You can only vote UP or vote down!')
        }*/
        /*if (instance.currentAvailablePieces<1){
            throw new Error('No free rooms!');
        }*/
        await replaceById(req,instance);
        res.redirect(`/details/${req.params.id}`);
        



        
    } catch (error) {
        let errors=parseError(error);
        const instance=error.instance;
        const user=req.userData;
        //res.render('detailsInstance',{errors,instance,user});
        res.render(`detailsInstance`,{errors,instance,user});
    }


})
/*enrollInstanceController.get('/:id',async (req,res)=>{
    res.redirect(`/details/${req.params.id}`)
})*/
module.exports=enrollInstanceController