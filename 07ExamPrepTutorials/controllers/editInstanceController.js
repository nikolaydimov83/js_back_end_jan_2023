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
        await replaceById(req,instance);
        res.redirect('/');
        

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