
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
body('firstName')
    .isLength({min:1}).withMessage('First name should be at least 1 character long!'),
body('lastName')
    .isLength({min:1}).withMessage('First name should be at least 1 character long!'),
    //.isAlphanumeric().withMessage('Password: Only latin letters and numbers allowed!'),
body('email')
        .custom(async(value)=>{
            let regex=/^[A-Za-z0-9 ]+@[A-Za-z0-9 ]+\.[A-Za-z0-9 ]+$/
             if(!regex.test(value)){
                throw new Error('Err mail');
            }
        }).withMessage('Invalid email'),
body('password')
    .isLength({min:5}).withMessage('Invalid password must be at least 5 characters long!')
    //.isAlphanumeric().withMessage('Password: Only latin letters and numbers allowed!')
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
        /*if(req.body.password==''||req.body.username==''){
            throw new Error('All fields are required!')
        }*/
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
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email
        });
    }

})

authController.post('/login',
//.isAlphanumeric().withMessage('Password: Only latin letters and numbers allowed!'),
body('email')
    .custom(async(value)=>{
        let regex=/^[A-Za-z0-9 ]+@[A-Za-z0-9 ]+\.[A-Za-z0-9 ]+$/
         if(!regex.test(value)){
            throw new Error('Err mail');
        }
    }).withMessage('Invalid email'),
body('password')
.isLength({min:5}).withMessage('Invalid password must be at least 5 characters long!'),
async (req,res)=>{

    try {
        let errors=validationResult(req).errors
        if (errors.length>0){
            throw errors
        }
        /*if(req.body.password==''||req.body.username==''){
            throw new Error('All fields are required!')
        }*/

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
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email

        });
    }

})

module.exports=authController;