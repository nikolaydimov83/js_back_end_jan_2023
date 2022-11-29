const directory=__dirname;
let http=require('http');
const { readAllCats, addNewBreed, readAllBreeds, addNewCat } = require('./src/data/processCatsData');
const { match, register } = require('./src/router');
const { addBreedView } = require('./src/views/addBreedView');


register('/','GET',readAllCats);
register('/cats/add-breed','GET',addBreedView);
register('/cats/add-breed','POST',addNewBreed);
register('/cats/add-cat','GET',readAllBreeds);
register('/cats/add-cat','POST',addNewCat)


let server=http.createServer((req,res)=>{
    req.directoryRoot=directory;
    match(req,res);
})
server.listen(3000)