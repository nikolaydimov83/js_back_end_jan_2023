const { html } = require("../utils");

let addCatTemplate=(breeds)=>{
    let formAsString=`
    
    <form method="POST" class="cat-form" enctype="multipart/form-data">
            <h2>Add Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name">
            <label for="description">Description</label>
            <textarea name="description" id="description"></textarea>
            <label for="image">Image</label>
            <input name="upload" type="file" id="image">
            <label for="group">Breed</label>
            <select name="breed" id="group">
                ${renderedCatList(breeds)}
            </select>
            <button type="submit">Add Cat</button>
        </form>
`;
    return formAsString
    }

    let renderedCatList=(data)=>{
        let result='';
        data.forEach((breed)=>{
        result+=`<option value="${breed.breed}">${breed.breed}</option>`
        });
        return result
    }
function addCatView(req,res){
    try {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html(addCatTemplate(res.innerTemplate)));
        res.end();
    } catch (error) {
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write(error.message);
        res.end();
    }
}
module.exports={addCatView}