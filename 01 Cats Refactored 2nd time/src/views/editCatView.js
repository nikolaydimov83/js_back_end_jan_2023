const {promises:fs}=require('fs');
const {getListInfo}=require('../data/handleCatsData');
const { errorHandler } = require('../errorHandlers/errorHandler');

async function showEditCat(req,res){
    try {
        let breeds=await getListInfo('breeds');
        let cats=await getListInfo('cats');
        let editCatHtml=await fs.readFile('./htmlExamples/editCat.html','utf-8');
        let cat=cats.filter((cat)=>{
            return cat.id===req.id;
        })[0];
        let formString=catFormInputsTemplate(breeds,cat);
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(editCatHtml.replace('{{editForm}}',formString))
        res.end();
    } catch (error) {
        errorHandler(error);
    }
}

let singleBreedTemplate=(breed,cat)=>{
    if(cat.breed===breed){
        return `<option selected="true" value="${breed}">${breed}</option>`
    }
    return `<option value="${breed}">${breed}</option>`
}

let catFormInputsTemplate=(breeds,cat)=>{
    let initialString=`<form method="POST" class="cat-form" enctype="multipart/form-data">
<h2>Edit Cat</h2>
<label for="name">Name</label>
<input name="name" type="text" id="name" value=${cat.name}>
<label for="description">Description</label>
<textarea name="description" id="description">${cat.description}</textarea>
<label for="image">Image</label>
<input name="upload" type="file" id="image">
<label for="group">Breed</label>
<select name="breed" value="${cat.breed}" id="group">
    {{breed list}}
</select>
<button>Edit Cat</button>
</form>`
let optionsString=``;
breeds.forEach(breed => {
    optionsString+=singleBreedTemplate(breed,cat);
    
});
    initialString.replace('{{breed list}}',optionsString);
    return initialString.replace('{{breed list}}',optionsString);
}

module.exports={showEditCat}
