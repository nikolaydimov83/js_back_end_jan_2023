const express=require('express');
const handlebars=require('express-handlebars');
const cookieParser=require('cookie-parser');
const tokenValidity=require('../middlewares/tokenValidity');
const trimBody=require('../middlewares/trimBody');
const guards = require('../middlewares/guards');

module.exports=(app)=>{
const hbs =handlebars.create({
    extname:'.hbs',
    helpers:{optionSelected:function(valueOption, bodyOption){
        if(!bodyOption){
            bodyOption="crypto-wallet";
        }
        if (valueOption===bodyOption){
            return 'selected'
        }else{
            return ''
        }
    }}
});

app.engine('.hbs',hbs.engine);
app.set('view engine', '.hbs');
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(tokenValidity());
app.use(trimBody());
app.use(guards());
}