const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { adresses, checkUserHasValidToken, findUserByToken } = require('../services/handleSessions');
const { readModelById } = require('../services/handleModelsData');






module.exports = (app) => {
app.use(cookieParser());

app.use(async (req,res,next)=>{
    
   res.locals.isLogged = await checkUserHasValidToken(req,res);
    next();
});

app.use(async (req,res,next)=>{
    if (res.locals.isLogged){
            let user=await findUserByToken(req.cookies.token);
    let userId=user._id.toString();
    
    let productId=req.originalUrl.split('/')[2]
    try {
        if (productId){
            let cube=await readModelById(productId);
            let indexOfCubeOwner=cube.owner.findIndex((owner)=>owner._id.toString()===userId)
            if (indexOfCubeOwner>-1){
                res.locals.isOwner=true
            }

        }
    } catch (error) {
        console.log(error.message)
    }
    }

     next();
 });


const hbr=handlebars.create({
    extname:'.hbs',
    helpers:{optionSelected:function(valueOption, diffLevel){
        if (valueOption===diffLevel){
            return 'selected'
        }else{
            return ''
        }
    }}
});

app.engine('hbs',hbr.engine);
app.set("view engine",'.hbs');
app.use(express.static('static'));
app.use(express.urlencoded());

app.use(async (req,res,next)=>{


    if (typeof adresses[req.originalUrl]==='function'){
        let userCanVisit=await adresses[req.originalUrl](req,res,next);
        if(!userCanVisit){
            res.status(403).send('You cannot visit this page!')
            return
        }
    }
 next();
})


    //TODO: Setup the view engine

    //TODO: Setup the body parser

    //TODO: Setup the static files

};