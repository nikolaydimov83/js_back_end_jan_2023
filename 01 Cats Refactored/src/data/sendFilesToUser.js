const fs=require('fs');
const path = require('path');
const fileTypeToContentType={
  'css':"text/css",
  'js':"text/javascript",
  'png':'image/png',
  'jpg':'image/jpeg'
}

function sendFile(req,res){
  try {
    const PATH = path.join(req.directoryRoot, req.url)
    let readStream=fs.createReadStream(PATH);
    readStream.on('open',()=>{
      res.writeHead(200,{'Content-Type':fileTypeToContentType[req.fileType]});
      readStream.pipe(res);
    });
    readStream.on('error',(err)=>{
      res.end(err);
    });
    
  
    return
    
    
  } catch (error) {
    res.writeHead(400,{'Content-Type':'text/plain'});
    res.write(error.message);
    res.end();
  }
    
    
      
      
}

module.exports={sendFile}