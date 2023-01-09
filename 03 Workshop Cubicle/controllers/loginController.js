const {loginUser } = require('../services/handleUsers');
const {body,validationResult}=require('express-validator');


const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',
body('username')
    .isLength({min:6}).withMessage('Username should be at least 6 chars long')
    .isAlphanumeric().withMessage('Only latin letters accepted'),
body('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 chars long'),

async (req,res)=>{

    try{
        let body=req.body;
        let {errors}=validationResult(req)
        let token= await loginUser(body);
        res.cookie('token',token);
        res.redirect(301,'/');
    }catch(err){
        res.send(err.message);
    }
    
});


module.exports=router