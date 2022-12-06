const {createReadStream}=require('fs');
//const { getAllBreeds } = require('../data/handleCatsData');
const { errorHandler } = require('../errorHandlers/errorHandler');

function showAddCat(req,res){
    try {
        createReadStream('./htmlExamples/addCat.html').pipe(res);
    } catch (error) {
        errorHandler(error);
    }
    
}

module.exports={showAddCat}