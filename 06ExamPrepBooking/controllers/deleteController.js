const {deleteHotelById}=require('../services/hotelServices');

const deleteHotelController=require('express').Router();

deleteHotelController.get('/:id',async (req,res)=>{
    try {
        await deleteHotelById(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/')
    }
})

module.exports=deleteHotelController