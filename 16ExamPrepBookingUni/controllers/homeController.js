const { getAll, getFirstElementstAll } = require('../services/instanceServices');


const homeController=require('express').Router();
// TO DO replace the home template with the one by assignemnt
homeController.get('/',async (req,res)=>{
    //let instances=await getFirstElementstAll(3,'Active');
    let instances=await getAll('Active');
    instances.sort((a,b)=>b.currentAvailablePieces-a.currentAvailablePieces);
    res.render('home',{
        title:'Home page',
        user:req.userData,
        instances
    })
});

homeController.get('/catalog',async (req,res)=>{
    let instances=await getAll('Active');
    
    res.render('catalog',{
        title:'Catalog page',
        user:req.userData,
        instances
    })
});

module.exports=homeController;