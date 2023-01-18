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

body('title').isLength({min:4}).withMessage('Invalid title length must be at least4 characters'),
body('description').isLength({min:20,max:50}).withMessage('Invalid length must be between 20 and 50 chars'),
body('imageUrl').isURL({ protocols: ['http','https']}).withMessage('You have enetered invalid image Url!'),
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
        res.redirect('/');
        

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