const fs=require('fs');

function showHome(req,res){
let data=fs.createReadStream('./htmlExamples/home/index.html','utf-8');
console.log(data);
}

module.exports={showHome}