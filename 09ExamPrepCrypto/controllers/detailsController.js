const { getById } = require('../services/instanceServices');


const detailsController=require('express').Router();

detailsController.get('/:id',async (req,res)=>{
    let id =req.params.id
    let instance=await getById(id);
    if (instance){
        instance.hasEnrolled=false
        let userEnrolled=0;
        if (req.userData!=='No token'&&req.userData!=='Invalid token'){
            userEnrolled=instance.enrolledUsers.filter((bookedUser)=>{
                return bookedUser._id.toString()==req.userData._id.toString()
            }).length
        }

    if (userEnrolled){
        instance.hasEnrolled=true;
    }
    }else{
        res.redirect('/');
        return
    }


    res.render('detailsInstance',{
        title:'Instance Details',
        user:req.userData.username,
        instance
    })
})

module.exports=detailsController