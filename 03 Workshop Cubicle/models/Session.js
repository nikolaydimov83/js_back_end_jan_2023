const {model, Schema}=require('mongoose');
const sessionSchema=new Schema(
    {
        username:{type:String,required:true},
        token:{type:String,required:true}
    })
let Session=model('Session',sessionSchema);

module.exports=Session