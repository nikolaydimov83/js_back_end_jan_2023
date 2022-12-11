const mongoDb=require('mongodb');
const connectionString='mongodb://localhost:27017';
const connection=new mongoDb.MongoClient(connectionString,{
    useUnifiedTopology:true
});