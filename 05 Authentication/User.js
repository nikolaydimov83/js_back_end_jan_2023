const {Schema,model}=require('mongoose');
let userSchema=new Schema({username:{type:String,required:true},hashPass:{type:String,required:true}});
const User=model('User',userSchema);

module.exports=User;