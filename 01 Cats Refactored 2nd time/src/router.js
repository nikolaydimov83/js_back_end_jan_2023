const { handleFile } = require("./data/handleFiles");


let router={}

function register(url,method,handler){
if(!router[url]){
    router[url]={}
}
router[url][method]=handler
}
function match(req,res){

    if (req.url.indexOf('edit')>0){
        req.id=req.url.split('/')[2];
        req.url='/edit';
    }
    if (req.url.indexOf('delete')>0){
        req.id=req.url.split('/')[2];
        req.url='/delete';
    }
    if(router[req.url]){
        if(typeof router[req.url][req.method]=='function'){
            router[req.url][req.method](req,res);
        }
    }else if(req.url.split('.').length>1){
            handleFile(req,res)
        }else{
            res.writeHead(404,{'Content-Type':'text/html'});
        }
}

module.exports={register,match}