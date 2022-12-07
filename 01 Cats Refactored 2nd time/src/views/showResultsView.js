const {promises:fs}=require('fs');
const { getListInfo, search } = require('../data/handleCatsData');
const { errorHandler } = require('../errorHandlers/errorHandler');


async function showResults(req,res){
let htmlHomeAsString='';

try {
    htmlHomeAsString=await fs.readFile('./htmlExamples/home/index.html','utf-8');
    
    let allCatsArray=await search(req,res);
    let renderedCatsList='' 
    allCatsArray.forEach((cat) => {
        renderedCatsList+=tempalteSingeCatCard(cat);
    });
    templateCatsList(renderedCatsList);
    let htmlResponse=htmlHomeAsString.replace('{{tempalte placeholder}}',templateCatsList(renderedCatsList));
    

    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(htmlResponse);
    res.end();
    
} catch (error) {
    errorHandler(req,res,error);
}


}

let templateCatsList=(renderedCatsList)=>`<h1>Results</h1><section class="cats">
<ul>

${renderedCatsList}
    
</ul>
</section>`

let tempalteSingeCatCard=(catData)=>{
    return `
<li>
    <img src=${catData.imageUrl}>
    <h3>${catData.name}</h3>
    <p><span>Breed: </span>${catData.breed}</p>
    <p><span>Description: </span>${catData.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/edit/${catData.id}">Change Info</a></li>
        <li class="btn delete"><a href="/delete/${catData.id}">New Home</a></li>
    </ul>
</li>`
}


module.exports={showResults}