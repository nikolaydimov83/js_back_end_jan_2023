const { addAccesoary } = require('../services/handleAccessoariesData');
const { addModel } = require('../services/handleModelsData');

const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('create');
});

router.post('/',async (req,res)=>{
    let body=req.body;
    try{
        await addModel(body)
        res.redirect(301,'/');
    }catch(err){
        res.send(err.message);
    }
    
});

router.get('/accesoary',(req,res)=>{
    res.render('createAccesoary');
});

router.post('/accesoary',async (req,res)=>{
   let body=req.body;
   try {
    await addAccesoary(body)
    res.redirect(301,'/');
   } catch (error) {
    res.send(error.message);
   }
});




module.exports=router