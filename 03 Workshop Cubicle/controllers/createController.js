const { addModel } = require('../models/handleModelsData');

const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('create');
});

router.post('/:search',async (req,res)=>{
    let body=req.body;
    try{
        await addModel(body)
        res.redirect(301,'/');
    }catch(err){
        res.send(err.message);
    }
    
});




module.exports=router