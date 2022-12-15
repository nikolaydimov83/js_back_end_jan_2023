const { getAccesoriesById } = require('../services/handleAccessoariesData');
const { readAllModels, readModelById } = require('../services/handleModelsData');

const router=require('express').Router();


router.get('/:id',async (req,res)=>{
    try {
        let id=req.params.id
        let model=await readModelById(id);
       
        res.render('details',{model,acc:model.accesoaries});
    } catch (error) {
        res.send(error.message);
    }

})

module.exports=router
