const {createReadStream,promises:fs}=require('fs');
//const { getAllBreeds } = require('../data/handleCatsData');
const { errorHandler } = require('../errorHandlers/errorHandler');

async function showAddBreed(req,res){
    try {
        res.writeHead(200,{"Content-Type":"text/html"});
        let a= createReadStream('./htmlExamples/addBreed.html').pipe(res);

        
    } catch (error) {
        errorHandler(error.message)
    }
    
    
}

module.exports={showAddBreed}