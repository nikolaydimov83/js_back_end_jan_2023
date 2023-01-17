const { body,validationResult } = require('express-validator');
const {createHotel}=require('../services/hotelServices');
const { addHotelToUser } = require('../services/userServices');
const { parseError, renameBodyProperties } = require('../util/utils');

const createHotelController=require('express').Router();

createHotelController.get('/',(req,res)=>{
    res.render('createHotel',{
                title:'Add hotel',
                user:req.userData.username});
});

createHotelController.post('/',

body('hotel').isLength({min:4}).withMessage('Invalid length must be at least4 characters'),
body('city').isLength({min:3}),
body('imgUrl').isURL({ protocols: ['http','https']}).withMessage('You have enetered invalid image Url!'),
body('free-rooms').isInt({min:1,max:100}).withMessage('Wrong number of free rooms - must be between 1 and 100'),
async (req,res)=>{
    try {
        
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }
        let hotel = renameBodyProperties(req);
        hotel.owner=req.userData._id;
        let createdHotel=await createHotel(hotel);
        await addHotelToUser(req,createdHotel)
        res.redirect('/');
        

    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
  
        
        res.render('createHotel',{
            title:'Add page',
            errors,
            user:req.userData.username,
            body:renameBodyProperties(req)
        });
    }
})



module.exports=createHotelController;