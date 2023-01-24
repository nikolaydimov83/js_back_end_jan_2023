const {Schema,model,Types}=require('mongoose');

//TO DO add user properties and validation according to assignment

const userSchema=new Schema({
    username:{type:String, required:true, minLength:5},
    //lastName:{type:String, required:true},
    hashedPass:{type:String, required:true},
    enrolled:{type:[Types.ObjectId],default:[],ref:'Instance'},
    offered:{type:[Types.ObjectId],default:[],ref:'Instance'},
    /*gender:{type:String, required:true,enum:['male','female']},*/
    /*email:{type:String, required:true, unique:true,validate:{
        validator:(value)=>{
            let regex=/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/
            return regex.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid email` }
    }},*/
    name:{type:String, required:true, unique:true,validate:{
        validator:(value)=>{
            let regex=/^[A-Z]+[a-z]+ [A-Z]+[a-z]+$/
            return regex.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid name` }
    }}/*,
    description:{type:String,maxLength:40,required:true}*/
});


/*userSchema.index({email:1},{
    collation:{
        locale:'en',
        strength:2
    }
});*/

userSchema.index({username:1},{
    collation:{
        locale:'en',
        strength:2
    }
});




const User=model('User', userSchema);

module.exports=User;