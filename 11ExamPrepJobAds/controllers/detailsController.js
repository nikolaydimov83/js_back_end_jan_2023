const { getById } = require('../services/instanceServices');
const { checkUserEnrolled } = require('../util/utils');


const detailsController=require('express').Router();

detailsController.get('/:id',async (req,res)=>{
    let id =req.params.id
    let instance=await getById(id);
    if (instance){
        instance.hasEnrolled=false
        let userEnrolled=false;
        if (req.userData!=='No token'&&req.userData!=='Invalid token'){
            userEnrolled = checkUserEnrolled(instance,req);

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