const mongoose=require('mongoose');
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
const connection=mongoose.connect(config.mongoAdress,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));