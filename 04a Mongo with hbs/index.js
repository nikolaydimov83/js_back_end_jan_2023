const express=require('express');
const hbr=require('express-handlebars').create({extname:'.hbs'});
const mongoose=require('mongoose');
const articleController = require('./controllers/articlesController');
const homeController = require('./controllers/homeContoller');
const connectionString='mongodb://localhost:27017/testdb2';

async function start(){
    const app=express();
    app.engine('.hbs',hbr.engine)
    app.set('view engine','.hbs');

    app.use(homeController);
    app.use('/articles',articleController);

    mongoose.connect(connectionString,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })


    app.listen(3000)

}
start();