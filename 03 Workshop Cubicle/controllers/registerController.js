const express = require('../config/express');
const { createUser } = require('../services/handleUsers');
const {body,validationResult}=require('express-validator');
const User = require('../models/User');


const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('register');
});

router.post('/',
body('username')
    //.isAlphanumeric()
    //.withMessage('Only latin letters and numbers are allowed for password')
    .custom(async(value)=>{
        if (await User.findOne({username:value})){
            throw new Error('Username already exists!')
        }
    }),
body('password')
.trim()
    .isLength({min:8})
    .withMessage('Password should be at least 6 chars long')
    .isAlphanumeric()
    .withMessage('Only latin letters and numbers are allowed for password'),
body('repeatPassword')
    .trim()
    .custom((value,{req})=>{
        return value==req.body.password.trim()
    })
    .withMessage('Passwords do not match'),
async (req,res)=>{
    let body=req.body;
    try{
        let {errors}=validationResult(req)
        if(errors.length>0){
            throw errors
        }
        let token= await createUser(body);
        res.cookie('token',token);
        res.redirect(301,'/');
    }catch(err){
        let { fields, username } = extractErrorFieldsAndUsername(req, err);

        res.render('register',{fields,username})
    }

});


module.exports=router


