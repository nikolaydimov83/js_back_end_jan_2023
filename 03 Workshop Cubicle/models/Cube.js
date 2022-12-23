const {Schema, model,Types}=require('mongoose');

let cubeSchema=new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true,maxLength:600},
    imageUrl:{type:String, required:true, match:/^http[s]*:\/\/[a-zA-Z0-9]*/},
    diffLevel:{type:Number, required:true, min:1, max:6},
    accesoaries:{type:[Types.ObjectId],default:[],ref:'Accesoary'},
    owner:{type:[Types.ObjectId],required:true,ref:'User'}
});

let Cube=model('Cube',cubeSchema);

module.exports=Cube;