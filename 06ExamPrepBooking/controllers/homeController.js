const homeController=require('express').Router();

homeController.get('/',(req,res)=>{
    res.render('home',{
        title:'Home page',
        user:req.userData.username
    })
});

module.exports=homeController;