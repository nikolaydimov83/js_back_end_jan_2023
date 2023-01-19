
const { findUserById } = require('../services/userServices');


const userController=require('express').Router();

userController.get('/',async (req,res)=>{
    let id =req.userData._id;
    let user=await findUserById(id)
    //user.userBookedHotelsAsStr=user.bookedHotels.map((h)=>h.name).join(', ');
    

    res.render('profile',{
        title:'User Details',
        user:req.userData.username,
        userData:user
    })
})

module.exports=userController