const bcrypt =require('bcrypt');
const User = require('../models/User');
const { createToken } = require('./handleSessions');


async function createUser(userData){
if (userData.repeatPassword!=userData.password){
    throw new Error('Passwords do not match!')
}
if (await User.findOne({username:userData.username})){
    throw new Error('Username already exists!')
}

let hashedPass=await bcrypt.hash(userData.password,10);

await User.create({username:userData.username,hashedPass});

return await createToken(userData.username,hashedPass);


}

async function loginUser(userData){

    
  
    
    let user=await User.findOne({username:userData.username});
    let result=await bcrypt.compare(userData.password,user.hashedPass);
    if(!user||!result){
        throw new Error('Invalid username or password!')
    }
    
    
    return await createToken(userData.username,user.hashedPass);
    
    
    }

module.exports={createUser,loginUser}
