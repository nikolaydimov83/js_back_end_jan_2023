const { body,validationResult } = require('express-validator');
const {create}=require('../services/instanceServices');
const { assignInstanceToUser } = require('../services/userServices');
const { parseError, renameBodyProperties } = require('../util/utils');

const createInstanceController=require('express').Router();

createInstanceController.get('/',(req,res)=>{
    res.render('createInstance',{
                title:'Add hotel',
                user:req.userData});
});

createInstanceController.post('/',

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
            user:req.userData,
            body:renameBodyProperties(req)
        });
    }
})



module.exports=createInstanceController;