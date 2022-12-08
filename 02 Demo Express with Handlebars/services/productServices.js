const fs=require('fs');
const { resolve } = require('path');
let products=JSON.parse(fs.readFileSync('./services/data.json','utf-8'));
console.log(products);
function getAllProducts(){
    return products
}

function getProductById(id){
   let result= products.filter((product)=>product.id===id)[0];
   return result
}

function addProduct(product){
    product.id='adcf-'+Math.floor(Math.random()*100000).toString().substring(0,4);
    products.push(product);
    return new Promise((resolve,reject)=>{
        fs.writeFile('./services/data.json',JSON.stringify(products,null,2),(err)=>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        });
        
    })
}

function deleteProduct(id){
    let index=products.findIndex((product)=>product.id===id);
    products.splice(index,1);
    return new Promise((resolve,reject)=>{
        fs.writeFile('./services/data.json',JSON.stringify(products,null,2),(err)=>{
            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    })
}

function editProduct(id,data){
    let index=products.findIndex((product)=>product.id===id);
    products.splice(index,1,data);
}

module.exports={getAllProducts,getProductById,addProduct,deleteProduct,editProduct}