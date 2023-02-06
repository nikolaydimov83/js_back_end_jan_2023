const { getAll } = require('../services/instanceServices');


const searchController=require('express').Router();
// TO DO replace the home template with the one by assignemnt

searchController.get('/',async (req,res)=>{
    let instances=await getAll('Active');
    res.render('search',{
        title:'Search page',
        user:req.userData,
        instances,
        body:req.body
    })
});
searchController.post('/',async (req,res)=>{
    let instances=await getAll('Active');
        //this is actually very inefficient - to extract all the database instances. I do it because in hurry
        let filteredInstances=instances.filter((instance)=>{
            return (instance.name.toLowerCase().includes((req.body.searchName.toLowerCase()))&&instance.paymentMethod===req.body.paymentMethod)
        });
        

        
        /*if(req.body.paymentMethod){
            filteredInstances=filteredInstances.filter((instance)=>{
                return (instance.paymentMethod==req.body.paymentMethod)
            })
        }*/
       
    
    res.render('search',{
        title:'Search page',
        user:req.userData,
        instances:filteredInstances,
        body:req.body
    })
});

module.exports=searchController;