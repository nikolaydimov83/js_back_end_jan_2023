const { body,validationResult } = require('express-validator');
const {getById, replaceById}=require('../services/instanceServices');
const { parseError, renameBodyProperties } = require('../util/utils');

const editInstanceController=require('express').Router();

editInstanceController.get('/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        let instance=await getById(id);
        res.render('editInstance',{
                    title:'Edit Instance',
                    user:req.userData.username,
                    body:instance
                });
    } catch (error) {
        const errors=parseError(error);
        res.render('editInstance',{
            title:'Edit Instance',
            errors,
            user:req.userData.username,
            body:renameBodyProperties(req)
        });
    }

});

editInstanceController.post('/:id',

body('name').isLength({min:2}).withMessage('Invalid name length must be at least 2 characters'),
body('price').isFloat({gt:0.0}).withMessage('Price must be positive number'),
body('imageUrl').isURL({ protocols: ['http','https']}).withMessage('You have enetered invalid image Url!'),
body('description').isLength({min:10}).withMessage('Invalid review must be at least 10 characters'),
body('paymentMethod').isIn([`crypto-wallet`, `credit-card`, `debit-card`, `paypal`]).withMessage('Wrong payment method!'),

async (req,res)=>{
    try {
       
        
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }
        let instance = renameBodyProperties(req);

        instance.owner=req.userData._id;
        await replaceById(req,instance);
        res.redirect(`/details/${req.params.id}`);
        

    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
  
        
        res.render('editInstance',{
            title:'Edit instance',
            errors,
            user:req.userData.username,
            body:renameBodyProperties(req)
        });
    }
})


module.exports=editInstanceController;