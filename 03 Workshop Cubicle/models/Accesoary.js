const {model,Schema, Types}=require('mongoose');
let regexURL=/^http[s]*:\/\/[a-zA-Z0-9]*/;
let usernameRegex=/^[A-Za-z0-9 ]+$/;
let accesorySchema=new Schema({
    name:{
        type:String, 
        min:5, 
        validate:{
        validator:(value)=>{
            let result = usernameRegex.test(value)
            return result },
        message:(prop)=>`${prop.value} is not a valid Accessory name. Only latin letters and spaces are accepted!`
    }},
    description:{
        type:String, 
        required:true,
        min:20,
        validate:{
            validator:(value)=>{
                let result = usernameRegex.test(value)
                return result },
            message:(prop)=>`${prop.value} is not a valid Accessory description. Only latin letters and spaces are accepted!`
        }},
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