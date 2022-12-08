const { getProductById, deleteProduct } = require('../services/productServices');

const router=require('express').Router();

router.get('/:detailsId',(req,res)=>{
    let detailsId=req.params.detailsId;
    let product=getProductById(detailsId)
    res.render('delete',{detailsId,product});
});

router.post('/:detailsId',async (req,res)=>{
    let detailsId=req.params.detailsId;
    await deleteProduct(detailsId);
    res.redirect('/catalog');
});

module.exports=router