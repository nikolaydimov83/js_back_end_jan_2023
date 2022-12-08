const express=require("express");
const hbr=require("express-handlebars");
const handlebars=hbr.create({
    extname:'.hbs'
});

const app=express();
app.engine('hbs',handlebars.engine);
app.set("view engine",'.hbs');
app.use(express.static('static'));
app.use(express.urlencoded());
const homeController=require('./controlers/homeControler');
const aboutController=require('./controlers/aboutControler');
const catalogController=require('./controlers/catalogController');
const createController=require('./controlers/createController');
const deleteController=require('./controlers/deleteController');
app.use(homeController);
app.use(aboutController);
app.use('/catalog',catalogController);
app.use('/create',createController);
app.use('/delete',deleteController);

app.listen(3000);

