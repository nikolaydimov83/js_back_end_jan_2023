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