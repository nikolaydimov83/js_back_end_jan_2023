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
            bodyOption="male";
        }
        if (valueOption===bodyOption){
            return 'checked'
        }else{
            return ''
        }
    },
    profileImage:function(bodyOption){

        if (bodyOption==='male'){
            return '/static/images/male.png'
        }else{
            return '/static/images/female.png'
        }
    }
}
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