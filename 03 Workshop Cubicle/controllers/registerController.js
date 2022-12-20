const { createUser } = require('../services/handleUsers');


const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('register');
});

router.post('/',async (req,res)=>{
    let body=req.body;
    try{
       let token= await createUser(body);
       res.cookie('token',token);
        res.redirect(301,'/');
    }catch(err){
        res.send(err.message);
    }
    
});


module.exports=router