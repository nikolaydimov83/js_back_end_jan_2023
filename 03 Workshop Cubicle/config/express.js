const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');




module.exports = (app) => {



const hbr=handlebars.create({
    extname:'.hbs'
});

app.engine('hbs',hbr.engine);
app.set("view engine",'.hbs');
app.use(express.static('static'));
app.use(express.urlencoded());

    //TODO: Setup the view engine

    //TODO: Setup the body parser

    //TODO: Setup the static files

};