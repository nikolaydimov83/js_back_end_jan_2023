const { getAll } = require('../services/instanceServices');


const searchController=require('express').Router();
// TO DO replace the home template with the one by assignemnt

searchController.get('/',async (req,res)=>{
    let instances=await getAll();
    res.render('search',{
        title:'Search page',
        user:req.userData.username,
        instances
    })
});
searchController.post('/',async (req,res)=>{
    let courses=await getAll();
        //this is actually very inefficient - to extract all the database instances. I do it because in hurry
        let filteredCourses=courses.filter((course)=>{
            return course.name.toLowerCase().includes(req.body.name.toLowerCase())
        });

        
        if(req.body.paymentMethod){
            filteredCourses=filteredCourses.filter((course)=>{
                return (course.paymentMethod==req.body.paymentMethod)
            })
        }
       
    
    res.render('search',{
        title:'Search page',
        user:req.userData.username,
        instances:filteredCourses
    })
});

module.exports=searchController;