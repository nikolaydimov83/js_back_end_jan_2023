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

body('title').isLength({min:4}).withMessage('Invalid title length must be at least 4 characters'),
body('price').isFloat({gt:0.0}).withMessage('Price must be positive number'),
/*body('imageUrl').isURL({ protocols: ['http','https']}).withMessage('You have enetered invalid image Url!'),*/
body('description').isLength({max:200}).withMessage('Invalid review must be max 200 characters'),
body('category').isIn([`vehicles`, `estate`, `electronics`, `furniture`, `other`]).withMessage('Wrong category!'),
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