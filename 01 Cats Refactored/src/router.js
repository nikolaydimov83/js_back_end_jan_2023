const { sendFile } = require("./data/sendFilesToUser");


const router={}
const host='http://localhost:3000';
function register(path,requestMethod,handler){
    if (!router[path]){
        router[path]={}
    }
    router[path][requestMethod]=handler;
}

function match(req,res){
    console.log(host);
    console.log(req.path);
let url=new URL(req.url,host)
console.log(url.host);
console.log(url.pathname);

if(router[url.pathname]){
    if(typeof router[url.pathname][req.method]==='function'){
        router[url.pathname][req.method](req,res);
    }else{
        console.log('This method is not supported for the specified path')
    }
    

}else{
        let fileName = url.pathname.split('/').pop();
        let fileType = fileName.split('.')[1];
        if (fileType) {
            req.fileType = fileType;
            sendFile(req, res);
        }
}


}

module.exports={register,match}

function checkIfFileRequested(url, req, res) {

}
