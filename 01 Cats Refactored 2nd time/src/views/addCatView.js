const {promises:fs}=require('fs');
const {getListInfo}=require('../data/handleCatsData');
const { errorHandler } = require('../errorHandlers/errorHandler');

async function showAddCat(req,res){
    try {
        let breeds=await getListInfo('breeds');
        let addCatHtml=await fs.readFile('./htmlExamples/addCat.html','utf-8');
        let optionsString=``
        breeds.forEach(breed => {
            optionsString+=singleBreedTemplate(breed);
        });
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(addCatHtml.replace('{{breed list}}',optionsString))
        res.end();
    } catch (error) {
        errorHandler(error);
    }
    
}

let singleBreedTemplate=(breed)=>{
    return `<option value=${breed}>${breed}</option>`
}

module.exports={showAddCat}