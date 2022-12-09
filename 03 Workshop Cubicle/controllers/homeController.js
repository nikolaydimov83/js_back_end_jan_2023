const { readAllModels, readModelById, search } = require('../models/handleModelsData');

const router=require('express').Router();

router.get('/',async (req,res)=>{
    
    let models=await readAllModels();
    
    res.render('index',{models});
})

router.post('/',async (req,res)=>{
    let body=req.body;
    let models=await search(body);
    if(models){
        res.render('index',{models});
    }
    
})



module.exports=router
