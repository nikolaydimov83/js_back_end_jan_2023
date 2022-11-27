const http=require('http');
const url=require('url');
const querystring=require('querystring');
const fs=require('fs');
const {readMyFile, writeMyFile}=require('./content/data/dataProccessing')

const { pathHandlerObject } = require('./src/pathHandler');
const path1 = require('path');
const port=4040
const endPoints={
  allCats:path1.join(__dirname,'content/data/cats.json')
}
console.log(endPoints.allCats)
let server = http.createServer((req,res)=>{
   req.setEncoding('utf-8');
   let a=req.read();
    let pathname=url.parse(req.url).pathname;
    let allCats=readMyFile(endPoints.allCats)
    let body = '';
    if(pathname==='/cats/add-breed/addBreed'){

      
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log(body);
        let breeds=readMyFile('content/data/breeds.json');
        breeds.push(body);
        writeMyFile('content/data/breeds.json',JSON.stringify(breeds));
    });
    
    }
    let responseBody=pathHandlerObject[pathname](allCats);

    if (responseBody.isFileRequest) {
      res.setHeader('Content-Type', responseBody.header.contentType['Content-Type']);
      const FAVICON = path1.join(__dirname, pathname)
      fs.createReadStream(FAVICON).pipe(res);
      return;
    }




    res.writeHead(responseBody.header.status, responseBody.header.contentType); 
    res.write(responseBody.content);
    res.end();
})
server.listen(port)
console.log('Ubuntu says: Cats Server listens on port 4040...');