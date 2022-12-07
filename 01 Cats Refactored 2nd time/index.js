const http=require('http');
const { addNewBreed, addNewCat, editCat, deleteCat, search } = require('./src/data/handleCatsData');
const {match, register}=require('./src/router');
const { showAddBreed } = require('./src/views/addBreedView');
const {showAddCat} = require('./src/views/addCatView');
const { showEditCat } = require('./src/views/editCatView');
const { showHome } = require('./src/views/homeView');
const { showShelterCat } = require('./src/views/shelterCatView');
const { showResults } = require('./src/views/showResultsView');


register('/','GET',showHome);
register('/cats/add-breed','GET',showAddBreed);
register('/cats/add-breed','POST',addNewBreed);
register('/cats/add-cat','GET',showAddCat);
register('/cats/add-cat','POST',addNewCat);
register('/edit','GET',showEditCat);
register('/edit','POST',editCat);
register('/delete','GET',showShelterCat);
register('/delete','POST',deleteCat);
register('/search','POST',showResults);


const server=http.createServer((req,res)=>{
    req.globalPath=__dirname;
    match(req,res);

});
server.listen(7070)