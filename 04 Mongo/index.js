/*const mongoDb=require('mongodb');
const connectionString='mongodb://localhost:27017';*/
const connectionStringMongoose='mongodb://localhost:27017/testdb2';

const Person=require('./models/Person');
let mongoose=require('mongoose');




/*async function start(){

let connection=new mongoDb.MongoClient(connectionString,{
    useUnifiedTopology:true

});
let mongoDbClient = await connection.connect();
let database=mongoDbClient.db('testdb');
let collection=database.collection('people');
let query=collection.find({});
let data = await query.toArray();
console.log(data);

}*/


async function startMongoose(){

   let connection=mongoose.connect(connectionStringMongoose,{
       useUnifiedTopology:true,
       useNewUrlParser:true
    
   });

   

   let person=new Person({firstName:'Mer',lastName:'Merova', age:28});
   console.log(person.sayHi());
   await person.save();
   let data=await Person.find({});
   console.log(data[0].sayHi());
   console.log(data[0].fullName);
   console.log(data[0].fullName='Maria Dimova');

    
}

startMongoose();