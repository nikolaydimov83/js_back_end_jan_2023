const { TopologyDescriptionChangedEvent } = require('mongodb');
const {Schema, model}=require('mongoose');

let schemaPerson= new Schema({
    firstName:{type:String, required:true},
    lastName:String,
    age:Number,
    nationality:String
});


schemaPerson.methods.sayHi=function(){
    return `${this.firstName} says Hi!`
}
schemaPerson.path('nationality').validate(function(){
    let nationalities=['BG','SR']
    return nationalities.indexOf(this.nationality)>-1
},'Incorrect nationality input');
schemaPerson.virtual('fullName').get(function(){
    return this.firstName+' '+this.lastName;
}).set(function(fullName){
    let [firstName,lastName]=fullName.split(' ');
    this.firstName=firstName;
    this.lastName=lastName;
})

let Person=model('Person',schemaPerson);



module.exports=Person
