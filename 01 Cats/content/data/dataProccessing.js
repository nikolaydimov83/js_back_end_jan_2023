let fs=require('fs');

function readMyFile(pathname){
    let fileAsString=fs.readFileSync(pathname);
    try {
        let readFileAsObject=JSON.parse(fileAsString);
        return readFileAsObject
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function writeMyFile(pathname,data){
    fs.writeFileSync(pathname,data)
}

module.exports={readMyFile,writeMyFile}