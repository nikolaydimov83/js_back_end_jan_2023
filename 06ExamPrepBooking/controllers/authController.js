const { register, login } = require('../services/userServices');
const { parseError } = require('../util/utils');

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

authController.post('/register',async (req,res)=>{

    try {
        if(req.body.password==''||req.body.username==''){
            throw new Error('All fields are required!')
        }
        if(req.body.password!=req.body.rePassword){
            throw new Error('Passwords do not match!')
        }
        const token=await register(req.body);
        res.cookie('token',token);
        res.redirect('/');
    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
        //TO DO add error parser
        
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
        res.redirect('/');
    } catch (error) {
        const errors=parseError(error);
        //TO DO add error display to actual template
        //TO DO add error parser
        
        res.render('register',{
            title:'Register page',
            errors,
            username:req.body.username,
            email:req.body.email
        });
    }

})

module.exports=authController;