const { addProduct } = require('../services/productServices');

const router=require('express').Router();

router.get('/',(req,res)=>{
    res.render('create');
});

router.post('/',async (req,res)=>{
    let body=req.body;
    await addProduct(body);
    //console.log('Handling create request');
    res.redirect('/catalog');
});

module.exports=router;