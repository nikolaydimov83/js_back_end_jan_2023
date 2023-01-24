
const { findUserById } = require('../services/userServices');


const userController=require('express').Router();

userController.get('/',async (req,res)=>{
    let id =req.userData._id;
    let user=await findUserById(id)
    //user.userBookedHotelsAsStr=user.bookedHotels.map((h)=>h.name).join(', ');
    user.trips=user.enrolled.length;
    

    res.render('profile',{
        title:'User Details',
        user:req.userData,
        userData:user
    })
})

module.exports=userController