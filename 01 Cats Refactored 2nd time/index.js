const http=require('http');
const {match, register}=require('./src/router');
const { showHome } = require('./src/views/home');


register('/','GET',showHome);

const server=http.createServer((req,res)=>{
    match(req,res)

});
server.listen(7070)