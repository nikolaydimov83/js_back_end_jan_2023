const {Schema,model,Types}=require('mongoose');
let regexURL=/^http[s]*:\/\/[a-zA-Z0-9._!@#$%^&*?]*$/;
//TO DO add user properties and validation according to assignment

let courseSchema=new Schema({
    title:{type:String, unique:true, required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    stars:{type:Number,required:true},
    review:{type:String, required:true},
    imageUrl:{type:String/*,validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }*/},
    createdAt:{type:Date,required:true,default:Date.now(),immutable: true},
    enrolledUsers:{type:[Types.ObjectId],default:[],ref:'User'},
    owner:{type:Types.ObjectId,required:true,ref:'User'}
    
});
/*•	The Title should be at least 2 characters
•	The Author should be at least 5 characters
•	The Genre should be at least 3 characters
•	The Stars should be a positive number between 1 and 5
•	The Image should start with http:// or https://.
•	The Review should be a minimum of 10 characters long.*/
courseSchema.index({title:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

 


const Instance=model('Instance', courseSchema);

module.exports=Instance;


