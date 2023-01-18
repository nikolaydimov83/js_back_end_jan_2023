const {Schema,model,Types}=require('mongoose');
let regexURL=/^http[s]*:\/\/[a-zA-Z0-9._!@#$%^&*?]*$/;
//TO DO add user properties and validation according to assignment

let courseSchema=new Schema({
    title:{type:String, required:true, unique:true},
    description:{type:String, required:true,maxLength:50},
    imageUrl:{type:String, required:true/*,validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }*/},
    duration:{type:String,required:true},
    createdAt:{type:Date,required:true,default:Date.now(),immutable: true},
    enrolledUsers:{type:[Types.ObjectId],default:[],ref:'User'},
    owner:{type:Types.ObjectId,required:true,ref:'User'}
    
});

courseSchema.index({title:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

 


const Course=model('Course', courseSchema);

module.exports=Course;