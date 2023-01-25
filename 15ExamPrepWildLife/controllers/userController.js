
const { getAll } = require('../services/instanceServices');
const { findUserById } = require('../services/userServices');


const userController=require('express').Router();

userController.get('/',async (req,res)=>{
    let id =req.userData._id;
    let instances=await getAll('Active');
    let i= instances.filter((instance)=>instance.owner._id.toString()===id.toString())
    //user.userBookedHotelsAsStr=user.bookedHotels.map((h)=>h.name).join(', ');
    

    res.render('profile',{
        title:'User Details',
        user:req.userData,
        instances:i
    })
})

module.exports=userController