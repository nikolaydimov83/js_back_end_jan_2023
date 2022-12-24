const { getAccesoriesById } = require('../services/handleAccessoariesData');
const { readAllModels, readModelById, deleteModelById } = require('../services/handleModelsData');

const router=require('express').Router();


router.get('/:id',async (req,res)=>{
    try {
        let id=req.params.id
        let model=await readModelById(id);
       
        res.render('edit',{model,acc:model.accesoaries});
    } catch (error) {
        res.send(error.message);
    }

});

router.post('/:id',async (req,res)=>{
    try {
        let id=req.params.id
        await deleteModelById(id);
        res.redirect(301,'/');
    } catch (error) {
        res.send(error.message);
    }

});



module.exports=router
