const { getById } = require('../services/instanceServices');


const detailsController=require('express').Router();

detailsController.get('/:id',async (req,res)=>{
    let id =req.params.id
    let instance=await getById(id);
    if (instance){
        instance.hasEnrolled=false
        let userEnrolled=0;
        if (req.userData!=='No token'&&req.userData!=='Invalid token'){
            if (instance.enrolledUsers.length>0){
                if(instance.enrolledUsers[instance.enrolledUsers.length-1].toString()===req.userData._id.toString()){
                    userEnrolled=1;
                }
            }

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