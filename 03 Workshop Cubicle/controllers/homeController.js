const { readAllModels, readModelById, search } = require('../services/handleModelsData');

const router=require('express').Router();

router.get('/',async (req,res)=>{
    try {
        let models=await readAllModels();
        
        res.render('index',{models});
    } catch (error) {
        res.send(error.message);
    }

})

router.post('/',async (req,res)=>{
    try {
        let body=req.body;
        let models=await search(body);
        if(models){
            res.render('index',{models});
        }
    } catch (error) {
        res.send(error.message);
    }

    
})



module.exports=router
