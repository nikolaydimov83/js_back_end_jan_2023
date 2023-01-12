const {Schema,model}=require('mongoose');

//TO DO add user properties and validation according to assignment

const userSchema=new Schema({
    username:{type:String, required:true, unique:true,minLength:[3,'Username should be at least 3 characters long!']},
    hashedPass:{type:String, required:true},
    email:{type:String, required:true, unique:true,minLength:[3,'Email should be at least 3 characters long!']}
});

userSchema.index({username:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

const User=model('User', userSchema);

module.exports=User;