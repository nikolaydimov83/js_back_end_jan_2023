const { getAllHotels } = require('../services/hotelServices');

const homeController=require('express').Router();
// TO DO replace the home template with the one by assignemnt
homeController.get('/',async (req,res)=>{
    let hotels=await getAllHotels();
    res.render('home',{
        title:'Home page',
        user:req.userData.username,
        hotels
    })
});

module.exports=homeController;