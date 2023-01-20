const { body,validationResult } = require('express-validator');
const {create}=require('../services/instanceServices');
const { assignInstanceToUser } = require('../services/userServices');
const { parseError, renameBodyProperties } = require('../util/utils');

const createInstanceController=require('express').Router();

createInstanceController.get('/',(req,res)=>{
    res.render('createInstance',{
                title:'Add hotel',
                user:req.userData.username});
});

createInstanceController.post('/',

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
        let createdInstance=await create(instance);
        await assignInstanceToUser(req,createdInstance)
        res.redirect('/catalog');
        

    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
  
        
        res.render('createInstance',{
            title:'Add page',
            errors,
            user:req.userData.username,
            body:renameBodyProperties(req)
        });
    }
})



module.exports=createInstanceController;