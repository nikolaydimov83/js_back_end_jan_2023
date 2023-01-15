
const { register, login } = require('../services/userServices');
const { parseError } = require('../util/utils');
const {body,validationResult}=require('express-validator');

const authController=require('express').Router();

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
//To do check all validations
body('username')
    .notEmpty().withMessage('Username is required field'),
body('email')
    .custom(async(value)=>{
        let emailRegex=/^[A-Za-z0-9 ]+@[A-Za-z0-9 ]+.[A-Za-z0-9 ]+$/
        if (!emailRegex.test(value)){
            throw new Error(`${value} is not a valid email. Only latin letters and numbers are accepted!`)
        }
    }).withMessage('You have enetered invalid mail adress!'),
body('password').isLength({min:5}).withMessage('Invalid password must be at least 5 characters long!')
//.isAlphanumeric()
//.withMessage('Only latin letters and numbers are allowed for password')
/*.custom(async(value)=>{
    let usernameRegex=/^[A-Za-z0-9 ]+$/
    if (!usernameRegex.test(value)){
        throw new Error(`${value} is not a valid user name. Only latin letters and spaces are accepted!`)
    }
})*/,async (req,res)=>{

    try {
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }
        if(req.body.password==''||req.body.username==''||req.body.email==''){
            throw new Error('All fields are required!')
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
        //TO DO add error display to actual template
  
        
        res.render('register',{
            title:'Register page',
            errors,
            username:req.body.username,
            email:req.body.email
        });
    }

})

authController.post('/login',async (req,res)=>{

    try {
        if(req.body.password==''||req.body.username==''){
            throw new Error('All fields are required!')
        }

        const token=await login(req.body);
        res.cookie('token',token);
        //TO DO check where user is redirected

        res.redirect('/');


    } catch (error) {
        const errors=parseError(error);

        //TO DO add error display to actual template
    
        
        res.render('login',{
            title:'Login page',
            errors,
            username:req.body.username,

        });
    }

})

module.exports=authController;