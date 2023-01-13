const {Schema,model,Types}=require('mongoose');

//TO DO add user properties and validation according to assignment

const userSchema=new Schema({
    username:{type:String, required:true, unique:true},
    hashedPass:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    bookedHotels:{type:[Types.ObjectId],default:[],ref:'Hotel'},
    offeredHotels:{type:[Types.ObjectId],default:[],ref:'Hotel'},
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