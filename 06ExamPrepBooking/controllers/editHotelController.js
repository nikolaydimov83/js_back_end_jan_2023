const { body,validationResult } = require('express-validator');
const {readHotelById, replaceHotelById}=require('../services/hotelServices');
const { parseError, renameBodyProperties } = require('../util/utils');

const editHotelController=require('express').Router();

editHotelController.get('/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        let hotel=await readHotelById(id);
        res.render('editHotel',{
                    title:'Edit hotel',
                    user:req.userData.username,
                    body:hotel
                });
    } catch (error) {
        const errors=parseError(error);
        res.render('editHotel',{
            title:'Add page',
            errors,
            user:req.userData.username,
            body:renameBodyProperties(req)
        });
    }

});

editHotelController.post('/:id',

body('hotel')
    .isLength({min:4}).withMessage('Invalid length must be at least4 characters'),
body('city')
    .isLength({min:3}).withMessage('Invalid city Input. Must be 3 or more chars'),
body('imgUrl')
    .isURL({ protocols: ['http','https']}).withMessage('You have enetered invalid image Url!'),
body('free-rooms')
    .isInt({min:1,max:100}).withMessage('Wrong number of free rooms - must be between 1 and 100'),
async (req,res)=>{
    try {
        let id=req.params.id;
        
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }
        let hotel = renameBodyProperties(req);

        hotel.owner=req.userData._id;
        await replaceHotelById(req,hotel);
        res.redirect('/');
        

    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
  
        
        res.render('editHotel',{
            title:'Add page',
            errors,
            user:req.userData.username,
            body:renameBodyProperties(req)
        });
    }
})


module.exports=editHotelController;