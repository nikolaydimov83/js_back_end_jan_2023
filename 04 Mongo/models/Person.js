const {Schema, model}=require('mongoose');

let schemaPerson= new Schema({
    firstName:{type:String, required:true},
    lastName:String,
    age:Number
});


schemaPerson.methods.sayHi=function(){
    return `${this.firstName} says Hi!`
}

schemaPerson.virtual('fullName').get(function(){
    return this.firstName+' '+this.lastName;
}).set(function(record,fullname){
    let [firstName,lastName]=fullname.split(' ');
    this.firstName=firstName;
    this.lastName=lastName;
})

let Person=model('Person',schemaPerson);



module.exports=Person
