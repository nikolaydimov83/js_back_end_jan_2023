const {Schema,model}=require('mongoose');

const articleSchema=new Schema({
    title:{type:String,minLength:10},
    author:{type:String,minLength:10},
    content:{type:String,minLength:10}
})

const Article=model('Article',articleSchema);

module.exports=Article