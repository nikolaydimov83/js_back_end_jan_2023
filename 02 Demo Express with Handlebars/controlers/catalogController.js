const { getAllProducts, getProductById } = require('../services/productServices');

const router=require('express').Router()

router.get('/',(req,res)=>{
    let products=getAllProducts();
    res.render('catalog',{products});
});

router.get('/:detailsId',(req,res)=>{
    let detailsId=req.params.detailsId;
    let product=getProductById(detailsId)
    res.render('details',{product});
});

module.exports=router