const {model,Schema,Types}=require('mongoose');
let usernameRegex=/^[A-Za-z0-9 ]+$/
const userSchema=new Schema(
    {
      username:{
        type:String,
        unique:true,
        min:5,
        validate:{
            validator:(value)=>{
                let result = usernameRegex.test(value)
                return result },
            message:(prop)=>`${prop.value} is not a valid user name. Only latin letters and spaces are accepted!`
        }
    },
      hashedPass:{type:String},
      activeSessions:{
            type:[Types.ObjectId],
            default:[],
            ref:'Session'
        }
    });
userSchema.index({username:1},{
    unique:true,
    collation:{
        locale:'en',
        strength:2
    }
})
const User=model('User',userSchema);

module.exports=User
