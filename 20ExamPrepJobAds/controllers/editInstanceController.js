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
                    user:req.userData,
                    body:instance
                });
    } catch (error) {
        const errors=parseError(error);
        res.render('editInstance',{
            title:'Edit Instance',
            errors,
            user:req.userData,
            body:renameBodyProperties(req)
        });
    }

});

editInstanceController.post('/:id',

async (req,res)=>{
    try {
       
        
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }
        let instance = renameBodyProperties(req);

        instance.owner=req.userData._id;
        let dbInstance=await getById(req.params.id);
       
        if (dbInstance){
            if(!dbInstance.lastEnrolled&&(instance.price<=0)){
                throw new Error('Price cannot be less than 0');
            }
            if(dbInstance.lastEnrolled){
                instance.price=dbInstance.price
                instance.lastEnrolled=dbInstance.lastEnrolled;
                instance.enrolledUsers=dbInstance.lastEnrolled;
            }
        }

        await replaceById(req,instance);
        res.redirect(`/details/${req.params.id}`);
        

    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
  
        
        res.render('editInstance',{
            title:'Edit instance',
            errors,
            user:req.userData,
            body:renameBodyProperties(req)
        });
    }
})


module.exports=editInstanceController;