const {createReadStream,promises:fs}=require('fs');

let contentTypes={
    "css":"text/css",
    "jpg":"image/jpeg",
    "ico":"image/x-icon",
    "png":"image/png"
}

function handleFile(req,res){

    let contentType=req.url.split('.')[req.url.split('.').length-1];
    res.writeHead(200,{"Content-Type":contentTypes[contentType]})
    let path='.'+req.url
    if (path==='./favicon.ico'){
        path='./content/images/favicon.ico'
    }
    createReadStream(path).pipe(res)
}

module.exports={handleFile}