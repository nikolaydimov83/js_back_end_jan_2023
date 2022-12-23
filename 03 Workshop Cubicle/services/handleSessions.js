const Session = require("../models/Session");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const secret = 'MySuperPrivateSecret';



const adresses={
    '/create':checkUserHasValidToken
}

async function checkUserHasValidToken(req, res){

try {
    if(!req.cookies.token){
        throw new Error('You are not authenticated!');
    }else{
        const decodedToken = jwt.verify(req.cookies.token,secret);
        let user=await User.findOne({username:decodedToken.username,hashedPass:decodedToken.hashedPass})
        if(user){
            return true
        }else{
            return false
        }
    }
} catch (error) {
    return false
} 

}

async function findUserByToken(token){
    try {
        const decodedToken = jwt.verify(token,secret);
        let userId=User.findOne({username:decodedToken.username}).lean();
        return userId
    } catch (error) {
        throw new Error(error.message)
    }

}

async function createToken(username,hashedPass){
    const payloads = { username, hashedPass};
    const options = { expiresIn: '2d'};
    const token = jwt.sign(payloads, secret, options);
    return token
    
}
module.exports={adresses,createToken,checkUserHasValidToken,findUserByToken}