const {model,Schema,Types}=require('mongoose');

const userSchema=new Schema(
    {
      username:{type:String},
      hashedPass:{type:String},
      activeSessions:{
            type:[Types.ObjectId],
            default:[],
            ref:'Session'
        }
    });

const User=model('User',userSchema);

module.exports=User
