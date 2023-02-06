const {Schema,model,Types}=require('mongoose');
let regexURL=/^http[s]{0,1}:\/\/.*$/;
let regexDate=/^[0-3]{1}[0-9]{1}\.[0-3]{1}[0-9]{1}\.[0-9]{4}$/
//TO DO add user properties and validation according to assignment

let instanceSchema=new Schema({
    headline:{type:String, required:true,minLength:4},
    //price:{type:Number, required:true,min:0.01},
    description:{type:String, required:true,maxLength:40},
    location:{type:String, required:true,minLength:8},
    name:{type:String, required:true,minLength:3},
    //paymentMethod:{type:String,required:true,eunum:["crypto-wallet", "credit-card", "debit-card", "paypal"]},
    //location:{type:String, required:true,maxLength:15},
    /*date:{type:String,minLength:10,maxLength:10,validate:{
        validator:(value)=>{
            return regexDate.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid date. Must be in format xx.yy.zzzz` }
    }},*/
    //description:{type:String,required:true,minLength:8},
    //certificate:{type:String,required:true,enum: [`Yes`, `No`]},
    //availablePieces:{type:Number,required:true,min:1,max:100},
    //description:{type:String,required:true,maxLength:60},
    /*imageUrl:{type:String,required:true,validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }},*/
    createdAt:{type:Date,required:true,immutable: true},
    enrolledUsers:{type:[Types.ObjectId],default:[],ref:'User'},
    owner:{type:Types.ObjectId,required:true,ref:'User'},
    status:{type:String,default:'Active'},
    rating:{type:Number,required:true,default:0}
    
});

/*instanceSchema.index({name:1},{
    collation:{
        locale:'en',
        strength:2
    }
});*/


 


const Instance=model('Instance', instanceSchema);

module.exports=Instance;


