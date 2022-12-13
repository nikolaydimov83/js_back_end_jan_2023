const Article = require("../models/Article");

async function getAllArticles(){
let articles=Article.find({}).lean();
return articles
}

async function getArticleById(id){
    let article=Article.findById(id).lean()
    return article
}

module.exports={getAllArticles, getArticleById}