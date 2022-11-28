

const { readMyFile, writeMyFile } = require("../content/data/dataProccessing");
const { siteCSS } = require("../content/styles/css");
const { addBreedView } = require("./views/addBreed");
const { homeView } = require("./views/home")



let pathHandlerObject={
    '/':(data)=>{
        /*let cats=readMyFile(`C:/Users/Nikolay Dimov/Documents/GitHub/JS_Back_End_Jan_2023/trunk/01 Cats/content/data/cats.json`)
        cats.push({
            "_id":"3",
            "catName":"Pretty Kitty 1",
            "breed":"Bombay Cat",
            "description":"Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
            "image":"https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg"
        })
        writeMyFile(`C:/Users/Nikolay Dimov/Documents/GitHub/JS_Back_End_Jan_2023/trunk/01 Cats/content/data/cats.json`,JSON.stringify(cats))*/
        let content=homeView(data);
        let header={}
        header.status=200;
        header.contentType={"Content-Type":"text/html"};
        return{content,header}
    },
    '/content/styles/site.css':()=>{
        let content=siteCSS;
        let header={}
        header.status=200;
        header.contentType={"Content-Type":"text/css"};
        return{content,header}
    },
    '/content/images/icon.png':()=>{
        
        let header={};
        header.status=200;
        header.contentType={'Content-Type':'image/png'};
        let content='';
        let isFileRequest=true
        return{content,header,isFileRequest}
    },
    '/cats/add-breed':()=>{
        let content=addBreedView();
        let header={}
        header.status=200;
        header.contentType={"Content-Type":"text/html"};
        return{content,header}
    },
    '/cats/src/frontend/breedsForm.js':(data)=>{
        let header={};
        header.status=200;
        header.contentType={'Content-Type':'text/javascript'};
        let content='';
        let isFileRequest=true
        return{content,header,isFileRequest}
    },
    '/cats/add-breed/addBreed':(cats,req)=>{
        let header={};
        
        let content='';
        let body='';
        if(req.method.toLowerCase()==='post'){

      try{
                    req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                console.log(body);
                let breeds=readMyFile('content/data/breeds.json');
                breeds.push(body);
                writeMyFile('content/data/breeds.json',JSON.stringify(breeds));
                content=homeView();
                header.status=200;
                return {header,content,isFileRequest}
            });
      }catch(err){
        header.status=400;
        content={message:err.message}
        return {header,content,isFileRequest}
      }

            
            }
        
    }
}

module.exports = {pathHandlerObject}


