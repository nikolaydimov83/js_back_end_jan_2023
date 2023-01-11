const { addAccesoary } = require('../services/handleAccessoariesData');
const { addModel } = require('../services/handleModelsData');
const { findUserByToken } = require('../services/handleSessions');
const { extractErrorFieldsAndUsername } = require('./utils/utils');

const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('create');
});

router.post('/',async (req,res)=>{
    let body=req.body;
   
    try{
        let user=await findUserByToken(req.cookies.token)
        body.owner=user._id;
        await addModel(body)
        res.redirect(301,'/');
    }catch(err){
        let { fields, username } = extractErrorFieldsAndUsername(req,err)
        res.render('create',{fields,username})
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
   } catch (err) {
    let { fields, username } = extractErrorFieldsAndUsername(req,err)
    res.render('createAccesoary',{fields,body})
   }
});




module.exports=router