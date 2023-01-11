const {loginUser } = require('../services/handleUsers');
const {body,validationResult}=require('express-validator');
const { extractErrorFieldsAndUsername } = require('./utils/utils');


const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',
body('username')
    //.isAlphanumeric()
    //.withMessage('Only latin letters and numbers are allowed for password')
    .custom(async(value)=>{
        let usernameRegex=/^[A-Za-z0-9 ]+$/
        if (!usernameRegex.test(value)){
            throw new Error(`${value} is not a valid user name. Only latin letters and spaces are accepted!`)
        }
    }),
body('password')
.trim()
    .isLength({min:3})
    .withMessage('Password should be at least 6 chars long')
    .isAlphanumeric()
    .withMessage('Only latin letters and numbers are allowed for password'),

async (req,res)=>{

    try{
        let body=req.body;
        let {errors}=validationResult(req);
        if(errors.length>0){
            throw errors
        }
        let token= await loginUser(body);
        res.cookie('token',token);
        res.redirect(301,'/');
    }catch(err){
        let { fields, username } = extractErrorFieldsAndUsername(req,err)

        res.render('login',{fields,username})
    }
    
});


module.exports=router