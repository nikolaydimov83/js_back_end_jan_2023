const {deleteById}=require('../services/instanceServices');

const deleteInstanceController=require('express').Router();

deleteInstanceController.get('/:id',async (req,res)=>{
    try {
        await deleteById(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        res.redirect(`/details/${req.params.id}`);
    }
})

module.exports=deleteInstanceController