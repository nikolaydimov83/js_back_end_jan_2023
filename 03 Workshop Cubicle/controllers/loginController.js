const {loginUser } = require('../services/handleUsers');


const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',async (req,res)=>{
    let body=req.body;
    try{
       let token= await loginUser(body);
       res.cookie('token',token);
        res.redirect(301,'/');
    }catch(err){
        res.send(err.message);
    }
    
});


module.exports=router