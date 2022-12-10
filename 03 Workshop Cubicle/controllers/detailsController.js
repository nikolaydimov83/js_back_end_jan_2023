const { readAllModels, readModelById } = require('../models/handleModelsData');

const router=require('express').Router();


router.get('/:id',async (req,res)=>{
    try {
        let id=req.params.id
        let model=await readModelById(id);
        res.render('details',{model});
    } catch (error) {
        res.send(error.message);
    }

})

module.exports=router
