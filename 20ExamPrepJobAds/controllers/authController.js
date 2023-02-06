
const { register, login } = require('../services/userServices');
const { parseError } = require('../util/utils');
const {body,validationResult}=require('express-validator');

const authController=require('express').Router();
const passwordLengthParam=5;

authController.get('/register',(req,res)=>{
    //TO DO replace with actual view by assignment
    res.render('register',{
        title:'Register page'
    })
})

authController.get('/login',(req,res)=>{


    //TO DO replace with actual view by assignment
    res.render('login',{
        title:'Login page'
    })
})

authController.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
})

authController.post('/register',
body('password')
    .isLength({min:passwordLengthParam})
    .withMessage(`Invalid password. Must be at least ${passwordLengthParam} chars long`),
//To do check all validations
async (req,res)=>{
    try {
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }

        if(req.body.password!=req.body.rePassword){
            throw new Error('Passwords do not match!')
        }
        //To check if session is created during the assignment
        const token=await register(req.body);
        res.cookie('token',token);
        //TO DO check where user is redirected
        res.redirect('/');
    } catch (error) {
        const errors=parseError(error);
        let instance=req.body
        //TO DO add error display to actual template
  
        
        res.render('register',{
            title:'Register page',
            errors,
            instance
        });
    }

})

authController.post('/login',

body('password')
.isLength({min:passwordLengthParam})
.withMessage(`Invalid password. Must be at least ${passwordLengthParam} chars long`),
async (req,res)=>{

    try {
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }


        const token=await login(req.body);
        res.cookie('token',token);
        //TO DO check where user is redirected

        res.redirect('/');


    } catch (error) {
        const errors=parseError(error);

        //TO DO add error display to actual template
        let instance=req.body
        
        res.render('login',{
            title:'Login page',
            errors,
            instance

        });
    }

})

module.exports=authController;