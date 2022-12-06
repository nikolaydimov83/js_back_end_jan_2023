const http=require('http');
const { addNewBreed, addNewCat } = require('./src/data/handleCatsData');
const {match, register}=require('./src/router');
const { showAddBreed } = require('./src/views/addBreedView');
const {showAddCat} = require('./src/views/addCatView');
const { showHome } = require('./src/views/home');


register('/','GET',showHome);
register('/cats/add-breed','GET',showAddBreed);
register('/cats/add-breed','POST',addNewBreed);
register('/cats/add-cat','GET',showAddCat);
register('/cats/add-cat','POST',addNewCat);


const server=http.createServer((req,res)=>{
    match(req,res)

});
server.listen(7070)