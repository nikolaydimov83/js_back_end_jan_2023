const { getAllAccesories, getEligibleAccesoariesById, attachAccesoaryToCube } = require('../services/handleAccessoariesData');
const { readModelById } = require('../services/handleModelsData');


const router=require('express').Router();

router.get('/accesory/:id',async(req,res)=>{
    let cubeId=req.params.id;
 
    let accesoryList=await getEligibleAccesoariesById(cubeId);
    

    res.render('attachAccesoary',{accesoryList});
})


router.post('/accesory/:id',async(req,res)=>{
    let id = req.params.id
    let body =req.body
    try {
        await attachAccesoaryToCube(id, body);
    res.redirect(301,'/');
    } catch (error) {
        let { fields, username } = extractErrorFieldsAndUsername(req,err)
        res.render('login',{fields,username})
    }
  
    
})

module.exports=router