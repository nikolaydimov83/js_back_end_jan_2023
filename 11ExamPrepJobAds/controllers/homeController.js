const { getAll, getFirstElementstAll } = require('../services/instanceServices');


const homeController=require('express').Router();
// TO DO replace the home template with the one by assignemnt
homeController.get('/',async (req,res)=>{
    let instances=getFirstElementstAll(3);
    let instances1=await getAll();
    res.render('home',{
        title:'Home page',
        user:req.userData.username
    })
});

homeController.get('/catalog',async (req,res)=>{
    let instances=await getAll();
    
    res.render('home',{
        title:'Home page',
        user:req.userData.username,
        instances
    })
});

module.exports=homeController;