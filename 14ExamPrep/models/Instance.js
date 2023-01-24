const {Schema,model,Types}=require('mongoose');
let regexURL=/^http[s]{0,1}:\/\/.*$/;
//TO DO add user properties and validation according to assignment

let instanceSchema=new Schema({
    title:{type:String, required:true,minLength:6},
    technique:{type:String,required:true,maxLength:15},
    certificate:{type:String,required:true,enum: [`Yes`, `No`]},
    //availablePieces:{type:Number,required:true,min:0,max:10},
    //description:{type:String,required:true,maxLength:60},
    imageUrl:{type:String,required:true,validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }},
    createdAt:{type:Date,required:true,immutable: true},
    enrolledUsers:{type:[Types.ObjectId],default:[],ref:'User'},
    owner:{type:Types.ObjectId,required:true,ref:'User'},
    status:{type:String,default:'Active'}
    
});


 


const Instance=model('Instance', instanceSchema);

module.exports=Instance;


