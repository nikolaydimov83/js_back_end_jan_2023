const {promises:fs}=require('fs');
const {getListInfo}=require('../data/handleCatsData');
const { errorHandler } = require('../errorHandlers/errorHandler');

async function showShelterCat(req,res){
    try {
        let cats=await getListInfo('cats');
        let shelterCatHtml=await fs.readFile('./htmlExamples/catShelter.html','utf-8');
        let cat=cats.filter((cat)=>{
            return cat.id===req.id;
        })[0];
        let formString=catShelterFormInputsTemplate(cat);
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(shelterCatHtml.replace('{{Form}}',formString))
        res.end();
    } catch (error) {
        errorHandler(error);
    }
}

let singleBreedTemplate=(cat)=>{
        return `<option selected="true" value="${cat.breed}">${cat.breed}</option>`
    
}

let catShelterFormInputsTemplate=(cat)=>{
    let initialString=`<form method="POST" class="cat-form">
    <h2>Shelter the cat</h2>
    <img src="${cat.imageUrl}" alt="">
    <label for="name">Name</label>
    <input name="name" type="text" id="name" value="${cat.name}" disabled>
    <label for="description">Description</label>
    <textarea name="description" id="description" disabled>${cat.description}</textarea>
    <label for="group">Breed</label>
    <select name="breed" id="group" disabled>
        ${singleBreedTemplate(cat)}
    </select>
    <button>SHELTER THE CAT</button>
</form>`


    return initialString;
}

module.exports={showShelterCat}