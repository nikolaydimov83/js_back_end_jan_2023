const { getAll } = require('../services/instanceServices');


const homeController=require('express').Router();
// TO DO replace the home template with the one by assignemnt
homeController.get('/',async (req,res)=>{
    let courses=await getAll();
    if(!res.locals.isLogged){
        courses.sort((a,b)=>b.enrolledUsers.length-a.enrolledUsers.length);
        let result=[];
        for (let i = 0; i < Math.min(courses.length,3); i++) {
            const element = courses[i];
            result.push(element);
        }
        courses=result;
    }else{
        
        courses.sort((a,b) =>  new Date(a.createdAt) - new Date(b.createdAt));
    }
    res.render('home',{
        title:'Home page',
        user:req.userData.username,
        instances:courses
    })
});

module.exports=homeController;