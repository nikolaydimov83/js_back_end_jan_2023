const {closeById}=require('../services/instanceServices');

const closeInstanceController=require('express').Router();

closeInstanceController.get('/:id',async (req,res)=>{
    try {
        await closeById(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        res.redirect(`/details/${req.params.id}`);
    }
})

module.exports=closeInstanceController;