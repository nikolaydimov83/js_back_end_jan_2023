const { readAllModels, readModelById } = require('../models/handleModelsData');

const router=require('express').Router();


router.get('/:id',async (req,res)=>{
    let id=req.params.id
    let model=await readModelById(id);
    
    res.render('details',{model});
})

module.exports=router
