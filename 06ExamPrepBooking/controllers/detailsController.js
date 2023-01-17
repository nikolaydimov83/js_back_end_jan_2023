const { readHotelById } = require('../services/hotelServices');


const detailsController=require('express').Router();

detailsController.get('/:id',async (req,res)=>{
    let id =req.params.id
    let hotel=await readHotelById(id);
    if (hotel){
        hotel.hasBooked=false
        let userBooked=hotel.bookedUsers.filter((bookedUser)=>{
            return bookedUser._id.toString()==req.userData._id.toString()
        }).length
    if (userBooked){
        hotel.hasBooked=true;
    }
    }else{
        res.redirect('/');
        return
    }


    res.render('detailsHotel',{
        title:'Hotel Details',
        user:req.userData.username,
        hotel
    })
})

module.exports=detailsController