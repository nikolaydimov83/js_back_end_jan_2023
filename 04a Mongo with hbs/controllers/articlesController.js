const Article = require('../models/Article');
const { getAllArticles, getArticleById } = require('../services/handleArticles');

const articleController=require('express').Router();

articleController.get(`/`,async (req,res)=>{
let articles=await getAllArticles();
res.render('articles',{articles});

})

articleController.get(`/:id`,async (req,res)=>{
let id=req.params.id
let article=await getArticleById(id)
res.render('articleDetails',{article})
})

module.exports=articleController;