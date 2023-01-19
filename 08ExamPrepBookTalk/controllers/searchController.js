const { getAll } = require('../services/instanceServices');


const searchController=require('express').Router();
// TO DO replace the home template with the one by assignemnt
searchController.post('/',async (req,res)=>{
    let courses=await getAll();
        //this is actually very inefficient - to extract all the database instances. I do it because in hurry
        let filteredCourses=courses.filter((course)=>{
            return course.title.toLocaleLowerCase().includes(req.body.searchString.toLocaleLowerCase())
        });
        filteredCourses.sort((a,b) =>  new Date(a.createdAt) - new Date(b.createdAt));
    
    res.render('home',{
        title:'Home page',
        user:req.userData.username,
        instances:filteredCourses
    })
});

module.exports=searchController;