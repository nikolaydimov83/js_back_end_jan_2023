const {model,Schema, Types}=require('mongoose');
let regexURL=/^http[s]*:\/\/[a-zA-Z0-9]*/
let accesorySchema=new Schema({
    name:{type:String, reguired:true},
    description:{type:String, required:true,maxLength:600},
    imageUrl:{type:String, required:true, validate:{
        validator:(value)=>{
            return regexURL.test(value);
        },
        message:(props)=>{return `${props.value} is not a valid image URL` }
    }},
    cubes:{type:[Types.ObjectId],default:[],ref:'Cube'}

})

const Accesoary=model('Accesoary', accesorySchema);
module.exports=Accesoary;