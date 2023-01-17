const {readHotelById,replaceHotelById}=require('../services/hotelServices');
const { addBookingToUser } = require('../services/userServices');
const { parseError } = require('../util/utils');

const bookHotelController=require('express').Router();

bookHotelController.get('/:id',async (req,res)=>{
    try {
        const hotel=await readHotelById(req.params.id);

        if(req.userData._id.toString()===hotel.owner._id.toString()){
            let error= new Error('You are the owner of this hotel. You cannot book room your own hotel!')
            error.hotel=hotel;
            error.user=req.userData.username;
            throw error
            
        }
        let userHasBooked=hotel.bookedUsers.find((user)=>user._id.toString()===req.userData._id.toString())
        if(userHasBooked){
            let error= new Error('You have already booked!')
            hotel.hasBooked=true;
            error.hotel=hotel;
            error.user=req.userData.username;
            throw error
            
        }

        if (hotel.currentFreeRooms>0){
            hotel.bookedUsers.push(req.userData._id);
            await addBookingToUser(req,hotel);
            await replaceHotelById(req,hotel);
            res.redirect(`/details/${req.params.id}`);
        }else{
            let error=new Error('Not Enough rooms!');
            error.hotel=hotel;
            error.user=req.userData.username;
            throw error
        }

        
    } catch (error) {
        let errors=parseError(error);
        const hotel=error.hotel;
        const user=error.user;
        res.render('detailsHotel',{errors,hotel,user});
    }
})

module.exports=bookHotelController