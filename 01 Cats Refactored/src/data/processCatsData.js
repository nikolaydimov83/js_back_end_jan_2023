const fs=require('fs');
const path = require('path');
const {IncomingForm}=require('formidable');
const { viewHome } = require('../views/homeView');
const { addCatView } = require('../views/addCatView');

const endPoints={
    allCats:path.join(__dirname,'/cats.json'),
    allBreeds:path.join(__dirname,'/breeds.json'),
    allImages:path.join('/content/images')
  }

function readAllCats(req,res){
    fs.readFile(endPoints.allCats,'utf8',(err,data)=>{
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"});
            res.write(err.message);
            res.end();
        }
        res.innerTemplate=JSON.parse(data);
        viewHome(req,res);

    })
}

function readAllBreeds(req,res){
    fs.readFile(endPoints.allBreeds,'utf8',(err,data)=>{
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"});
            res.write(err.message);
            res.end();
        }
        res.innerTemplate=JSON.parse(data);
        addCatView(req,res);

    })
}

function addNewBreed(req,res){
let form =new IncomingForm();
form.parse(req,(err,fields)=>{
    if(err){
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write(err.message);
        res.end();
    }
    fs.readFile(endPoints.allBreeds,'utf8',(err,data)=>{
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"});
            res.write(err.message);
            res.end();
        }
        let breeds=JSON.parse(data);
        breeds.push({
            id:breeds.length,
            breed:fields.breed
        })
        fs.writeFile(endPoints.allBreeds,JSON.stringify(breeds),(err)=>{
            if (err){
                res.writeHead(404,{"Content-Type":"text/plain"});
                res.write(err.message);
                res.end();
            }
            res.writeHead(301,{"Location":"/"});
            res.end();
        })
        
    })
})
}

function addNewCat(req,res){
    let form =new IncomingForm();
    form.uploadDir = path.join(req.directoryRoot,endPoints.allImages)
    let imagePath='';
    form.on('file', function(field, file) {
        //rename the incoming file to the file's name
            fs.rename(file.filepath,form.uploadDir+'/'+file.newFilename+'.'+file.originalFilename.split('.')[1],()=>{
                imagePath=path.join(form.uploadDir,'/'+file.newFilename+'.'+file.originalFilename.split('.')[1]);
            })
            
            
    });
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"});
            res.write(err.message);
            res.end();
        }
        fs.readFile(endPoints.allCats,'utf8',(err,data)=>{
            if(err){
                res.writeHead(404,{"Content-Type":"text/plain"});
                res.write(err.message);
                res.end();
            }
            let cats=JSON.parse(data);
            cats.push({
                _id:cats.length,
                catName:fields.name,
                breed:fields.breed,
                description:fields.description,
                image:imagePath
            })
            fs.writeFile(endPoints.allCats,JSON.stringify(cats),(err)=>{
                if (err){
                    res.writeHead(404,{"Content-Type":"text/plain"});
                    res.write(err.message);
                    res.end();
                }
                res.writeHead(301,{"Location":"/"});
                res.end();
            })

            
        })
    })
    }

module.exports={readAllCats,readAllBreeds,addNewBreed,addNewCat}