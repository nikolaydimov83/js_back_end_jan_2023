const {model, Schema,Types}=require('mongoose');

const articleSchema=new Schema({
    author:{type:String, required:true,minLength:10},
    title:{type:String, required:true,minLength:10},
    content:{type:String, required:true,minLength:10},
    comments:{type:[Types.ObjectId],default:[],ref:'Comment'}
});

let Article=model('Article', articleSchema);

module.exports=Article;