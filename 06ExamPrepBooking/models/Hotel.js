const {Schema,model,Types}=require('mongoose');
let regexURL=/^http[s]*:\/\/[a-zA-Z0-9._!@#$%^&*?]*$/;
//TO DO add user properties and validation according to assignment

let hotelSchema=new Schema({
    name:{type:String, required:true, unique:true,minLength:4},
    city:{type:String, required:true,minLength:3},
    imageUrl:{type:String, required:true/*,validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }*/},
    freeRooms:{type:Number,min:1, max:100},
    bookedUsers:{type:[Types.ObjectId],default:[],ref:'User'},
    owner:{type:Types.ObjectId,required:true,ref:'User'},
    currentFreeRooms:{type:Number},
    
});

hotelSchema.index({name:1},{
    collation:{
        locale:'en',
        strength:2
    }
});

 

hotelSchema.methods.getCurrentFreeRooms=function(){
    return this.freeRooms-this.bookedUsers.length
}

hotelSchema.virtual('virtualCurrentFreeRooms').get(function(){
    return this.freeRooms-this.bookedUsers.length
})
const Hotel=model('Hotel', hotelSchema);

module.exports=Hotel;