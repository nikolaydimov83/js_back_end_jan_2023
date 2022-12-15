const {model,Schema, Types}=require('mongoose');

let accesorySchema=new Schema({
    name:{type:String, reguired:true},
    description:{type:String, required:true,maxLength:600},
    imageUrl:{type:String, required:true, match:/^http[s]*:\/\/[a-zA-Z0-9]*/},
    cubes:{type:[Types.ObjectId],default:[],ref:'Cube'}

})

const Accesoary=model('Accesoary', accesorySchema);
module.exports=Accesoary;