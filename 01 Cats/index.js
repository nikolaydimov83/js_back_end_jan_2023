const http=require('http');
const url=require('url');
const querystring=require('querystring');
const fs=require('fs');

const { pathHandlerObject } = require('./src/pathHandler');
const path1 = require('path');
const port=4040

let server = http.createServer((req,res)=>{
    let pathname=url.parse(req.url).pathname;
    let responseBody=pathHandlerObject[pathname]();

    if (responseBody.isFileRequest) {
      res.setHeader('Content-Type', 'image/x-icon');
      const FAVICON = path1.join(__dirname, pathname)
      fs.createReadStream(FAVICON).pipe(res);
      return;
    }


    res.writeHead(responseBody.header.status, responseBody.header.contentType); 
    res.write(responseBody.content);
    res.end();
})
server.listen(port)
console.log('Cats Server listens on port 4040...');