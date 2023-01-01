const { getAccesoriesById } = require('../services/handleAccessoariesData');
const { readModelById, deleteModelById, replaceById } = require('../services/handleModelsData');

const router=require('express').Router();


router.get('/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        let model=await readModelById(id);
       
        res.render('edit',{model,acc:model.accesoaries});
    } catch (error) {
        res.send(error.message);
    }

});

router.post('/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        let body=req.body;
        await replaceById(id,body);
        res.redirect(301,'/');
    } catch (error) {
        res.send(error.message);
    }

});



module.exports=router;
