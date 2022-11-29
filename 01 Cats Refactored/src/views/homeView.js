const { html } = require("../utils")

let homeTemplate=(data)=>{
    return `<main>
    <section class="cats">
        <ul>
           ${renderedCatList(data)}
        </ul>
    </section>
</main>`
}


let renderedCatList=(data)=>{
    let result='';
    data.forEach((cat)=>{
    result+=`<li>
    <img src=${cat.image} alt="${cat.catName}">
    <h3>${cat.catName}</h3>
    <p><span>Breed: </span>${cat.breed}</p>
    <p><span>Description: </span>${cat.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="">Change Info</a></li>
        <li class="btn delete"><a href="">New Home</a></li>
    </ul>
</li>`
    });
    return result
}

let viewHome=(req,res)=>{
    let innerTemplate=homeTemplate(res.innerTemplate)
    
    try {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html(innerTemplate));
        res.end();
    } catch (error) {
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write(error.message);
        res.end();
    }
    return ;
}

module.exports={viewHome}