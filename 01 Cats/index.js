const http=require('http');
const url=require('url');
const querystring=require('querystring');
const fs=require('fs');
const {readMyFile, writeMyFile}=require('./content/data/dataProccessing');
const { homeView } = require("./src/views/home");
const { addBreedView } = require("./src/views/addBreed");
const { siteCSS } = require("./content/styles/css");


const { pathHandlerObject } = require('./src/pathHandler');
const path1 = require('path');
const { addCatView } = require('./src/views/addCat');
const port=4040
const endPoints={
  allCats:path1.join(__dirname,'content/data/cats.json')
}
console.log(endPoints.allCats)
let server = http.createServer((req,res)=>{
   
    let pathname=url.parse(req.url).pathname;
    let allCats=readMyFile(endPoints.allCats)
    let body = '';

    if(pathname==='/'&&req.method.toLocaleLowerCase()==='get'){
      let content=homeView(allCats);
      let header={};
      header.status=200;
      header.contentType={"Content-Type":"text/html"};

  
      res.writeHead(header.status, header.contentType); 
      res.write(content);
      res.end();

    }else if(pathname==='/content/styles/site.css'&&req.method.toLocaleLowerCase()==='get'){

      let content=siteCSS;
      let header={}
      header.status=200;
      header.contentType={"Content-Type":"text/css"};
      res.setHeader('Content-Type', header.contentType['Content-Type']);
     
      const FAVICON = path1.join(__dirname, pathname)
      fs.createReadStream(FAVICON).pipe(res);
      res.writeHead(header.status, header.contentType); 
      res.write(content);
      res.end();


    }else if(pathname==='/content/images/icon.png'){
    if(req.method.toLowerCase()==='get'){
      let header={};
      header.status=204;
      header.contentType={'Content-Type':'image/png'};
      let content='Favicon loaded'
      res.setHeader('Content-Type', header.contentType['Content-Type']);
      const FAVICON = path1.join(__dirname, pathname)
      fs.createReadStream(FAVICON).pipe(res);
      res.writeHead(header.status, header.contentType); 
      res.write(content);
      res.end();
    }
  }else if(pathname==='/cats/add-breed'){
    if(req.method.toLowerCase()==='get'){
      let content=addBreedView();
        let header={}
        header.status=200;
        header.contentType={"Content-Type":"text/html"};
        res.writeHead(header.status, header.contentType); 
        res.write(content);
        res.end();
    }
  }else if(pathname==='/cats/src/frontend/breedsForm.js'){
    if(req.method.toLocaleLowerCase()==='get'){
      let header={};
        header.status=200;
        header.contentType={'Content-Type':'text/javascript'};
        let content='';
        res.setHeader('Content-Type', header.contentType['Content-Type']);
        const FAVICON = path1.join(__dirname, pathname)
        fs.createReadStream(FAVICON).pipe(res);
        return
        /*res.writeHead(header.status, header.contentType); 
        res.write(content);
        res.end();*/
    }
  }
    
    else if(pathname==='/cats/add-breed/addBreed'&&req.method.toLowerCase()==='post'){

      
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log(body);
        let breeds=readMyFile('content/data/breeds.json');
        breeds.push(body);
        writeMyFile('content/data/breeds.json',JSON.stringify(breeds));
        
        let content={added:body}
        let header={};
        header.status=301;
        header.contentType={"location":"http://localhost:4040/"};

  
      res.writeHead(header.status, header.contentType); 
      //res.write(JSON.stringify(content));
      res.end();
    });
    
    }else if(pathname==='/cats/add-cat'){
      if(req.method.toLowerCase()==='get'){
        let breeds=readMyFile('content/data/breeds.json');
        let content=addCatView(breeds);
        let header={};
        header.status=200;
        header.contentType={"Content-Type":"text/html"};
  
    
        res.writeHead(header.status, header.contentType); 
        res.write(content);
        res.end();
      }
    }
    //let responseBody=pathHandlerObject[pathname](allCats);

    /*if (responseBody.isFileRequest) {
      res.setHeader('Content-Type', responseBody.header.contentType['Content-Type']);
      const FAVICON = path1.join(__dirname, pathname)
      fs.createReadStream(FAVICON).pipe(res);
      return;
    }*/




    /*res.writeHead(responseBody.header.status, responseBody.header.contentType); 
    res.write(responseBody.content);
    res.end();*/
})
server.listen(port)
console.log('Ubuntu says: Cats Server listens on port 4040...');