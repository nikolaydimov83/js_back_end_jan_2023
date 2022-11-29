const { html } = require("../utils");

let addBreedTemplate=()=>{
    let formAsString=`
    
    <form class="cat-form" method="post">
    <label for="breed">Breed Name</label>
    <input name="breed" type="text" id="breed">
    <button>Add Breed</button>
    </form>
`;
    return formAsString
    }
function addBreedView(req,res){
    try {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html(addBreedTemplate()));
        res.end();
    } catch (error) {
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write(error.message);
        res.end();
    }
}
module.exports={addBreedView}