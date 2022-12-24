const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('logout');
});

router.post('/',(req,res)=>{
    res.cookie('token','');
    res.redirect(301,'/');
});

module.exports=router