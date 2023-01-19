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

body('title').isLength({min:2}).withMessage('Invalid title length must be at least 2 characters'),
body('author').isLength({min:5}).withMessage('Invalid author length must be at least 5 characters'),
body('genre').isLength({min:3}).withMessage('Invalid genre length must be at least 3 characters'),
body('stars').isInt({min:1,max:5}).withMessage('Stars must be between 1 and 5'),
body('imageUrl').isURL({ protocols: ['http','https']}).withMessage('You have enetered invalid image Url!'),
body('review').isLength({min:10}).withMessage('Invalid review must be at least 10 characters'),
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