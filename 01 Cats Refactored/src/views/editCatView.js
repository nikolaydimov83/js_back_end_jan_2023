const { html } = require("../utils");

let editCatTemplate=(res)=>{
    let formAsString=`
    
    <form method="POST" class="cat-form" enctype="multipart/form-data">
            <h2>Edit Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value=${res.catInfo.catName}>
            <label for="description">Description</label>
            <textarea name="description" id="description">${res.catInfo.description}</textarea>
            <label for="image">Image</label>
            <input name="upload" type="file" id="image">
            <label for="group">Breed</label>
            <select name="breed" id="group">
                ${renderedCatList(res.breeds)}
            </select>
            <button type="submit">Edit Cat</button>
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
function editCatView(req,res){
    try {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html(editCatTemplate(res)));
        res.end();
    } catch (error) {
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write(error.message);
        res.end();
    }
}
module.exports={editCatView}