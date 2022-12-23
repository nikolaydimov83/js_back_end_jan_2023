const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { adresses, checkUserHasValidToken } = require('../services/handleSessions');






module.exports = (app) => {
app.use(cookieParser());

app.use(async (req,res,next)=>{
    
   res.locals.isLogged = await checkUserHasValidToken(req,res);
    next();
});




const hbr=handlebars.create({
    extname:'.hbs'
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