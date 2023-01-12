const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const JWT_SECRET='jcdsahjcvhsad3242sajchd';

async function register(userData){
    const username=userData.username;
    const password=userData.password;
    const userExists=await User.findOne({username}).collation({locale:'en',strength:2});
    if (userExists){
        throw new Error('User with same username already registered!');
    }

    let hashedPass=await bcrypt.hash(password,10);
    userData.hashedPass=hashedPass;
    delete userData.password;
    //TO DO check how the repass is in the form
    delete userData.rePassword;
    const user=await User.create(userData);

    //TO DO see assignment if registration creates user session
    const token=await createToken(user);
    return token
    
}

async function login(userData){

    let userFromDB=await User.findOne({username:userData.username}).lean();
    let userCheckResult=await bcrypt.compare(userData.password,userFromDB.hashedPass);
    
    if (!userFromDB||!userCheckResult){
        throw new Error('Wrong username or password');
    }
        return createToken(userFromDB._id,userFromDB.username);

    
}


async function createToken({_id,username}){

   const payload={_id,username};
   const options={ expiresIn: '2d'}
   let token =jwt.sign(payload,JWT_SECRET,options)
   
   return token

}

async function verifyToken(req,res){
    try {
        if(!req.cookies.token){
            throw new Error('You are not authenticated!');
        }else{
            const decodedToken = jwt.verify(req.cookies.token,JWT_SECRET);
            let user=await User.findById(decodedToken._id).lean();
            if(user){
                return user
            }else{
                return 'Invalid token'
            }
        }
    } catch (error) {
        return 'No token'
    } 

}

module.exports={login,register,verifyToken};