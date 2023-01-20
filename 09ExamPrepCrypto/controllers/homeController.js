const { getAll } = require('../services/instanceServices');


const homeController=require('express').Router();
// TO DO replace the home template with the one by assignemnt
homeController.get('/',async (req,res)=>{

    res.render('home',{
        title:'Home page',
        user:req.userData.username
    })
});

homeController.get('/catalog',async (req,res)=>{
    let books=await getAll();
    res.render('catalog',{
        title:'Catalog page',
        user:req.userData.username,
        instances:books
    })
});

module.exports=homeController;