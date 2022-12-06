function errorHandler(req,res,error){
    res.writeHead(404,{"Content-Type":"text/html"});
    res.write(error.message);
    res.end();
}

module.exports={errorHandler}