const {Schema,model,Types}=require('mongoose');

//TO DO add user properties and validation according to assignment

const userSchema=new Schema({
    username:{type:String, required:true, unique:true},
    hashedPass:{type:String, required:true},
    enrolled:{type:[Types.ObjectId],default:[],ref:'Instance'},
    offered:{type:[Types.ObjectId],default:[],ref:'Instance'},
    email:{type:String, required:true, unique:true}
});

userSchema.index({username:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

userSchema.index({email:1},{
    collation:{
        locale:'en',
        strength:2
    }
});




const User=model('User', userSchema);

module.exports=User;