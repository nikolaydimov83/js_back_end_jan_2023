const {Schema,model,Types}=require('mongoose');
let regexURL=/^http[s]{0,1}:\/\/.*$/;
//TO DO add user properties and validation according to assignment

let courseSchema=new Schema({
    startPoint:{type:String, required:true,minLength:4},
    endPoint:{type:String, required:true,minLength:4},
    seats:{type:Number,required:true,min:0,max:4},
    date:{type:String,required:true},
    time:{type:String,required:true},
    //category:{type:String,required:true,enum: [`vehicles`, `estate`, `electronics`, `furniture`, `other`]},
    price:{type:Number,required:true,min:1,max:50},
    description:{type:String,required:true,minLength:10},
    imageUrl:{type:String,required:true,validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }},
    brand:{type:String,minLength:4},
    createdAt:{type:Date,required:true,default:Date.now(),immutable: true},
    enrolledUsers:{type:[Types.ObjectId],default:[],ref:'User'},
    owner:{type:Types.ObjectId,required:true,ref:'User'},
    status:{type:String,default:'Active'}
    
});
/*•	The Title should be at least 2 characters
•	The Author should be at least 5 characters
•	The Genre should be at least 3 characters
•	The Stars should be a positive number between 1 and 5
•	The Image should start with http:// or https://.
•	The Review should be a minimum of 10 characters long.*/
/*courseSchema.index({name:1},{
    collation:{
        locale:'en',
        strength:2
    }
});*/

 


const Instance=model('Instance', courseSchema);

module.exports=Instance;


