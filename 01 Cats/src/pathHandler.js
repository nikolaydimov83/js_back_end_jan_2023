

const { siteCSS } = require("../content/styles/css");
const { homeView } = require("./views/home")



let pathHandlerObject={
    '/':(data)=>{
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
        console.log('File handler');
        let header={};
        header.status=200;
        header.contentType={'Content-Type':'image/png'};
        let content='';
        let isFileRequest=true
        return{content,header,isFileRequest}
    }
}

module.exports = {pathHandlerObject}


