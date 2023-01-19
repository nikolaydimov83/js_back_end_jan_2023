const mongoose=require('mongoose');

//To DO change the connection string with the real connction string

const CONNECTION_STRING='mongodb://localhost:27017/books'

module.exports=async (app)=>{

    try {
        await  mongoose.connect(CONNECTION_STRING,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log('Database connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }


}