const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


const JWT_SECRET='jcdsahjcvhsad3242sajchd';

async function register(userData){
   
    const username=userData.username;
    const password=userData.password;
    const email=userData.email;
    const userExists=await User.findOne({username}).collation({locale:'en',strength:2});
    const emailExists=await User.findOne({email}).collation({locale:'en',strength:2});
    
    if (userExists){
        throw new Error('User with same username already registered!');
    }

    if (emailExists){
        throw new Error('User with same email already registered!');
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
//To Do check if user checks with email or username
    let userFromDB=await User.findOne({email:userData.email}).lean();
    if (!userFromDB){
        throw new Error('Wrong username or password');
    }
    let userCheckResult=await bcrypt.compare(userData.password,userFromDB.hashedPass);
    
    if (!userCheckResult){
        throw new Error('Wrong username or password');
    }
        return createToken(userFromDB._id,userFromDB.email);

    
}


async function createToken({_id,email}){

   const payload={_id,email};
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

async function enrollUser(req,hotel){
    let user=await User.findById(req.userData._id);
    user.enrolled.push(hotel._id);
    await user.save();
}

async function assignInstanceToUser(req,hotel){
    let user=await User.findById(req.userData._id);
    user.offered.push(hotel._id);
    await user.save();
}

async function findUserById(id){
     let user= await User.findById(id).populate('enrolled').populate('offered').lean();
     decorateSingleUser(user);
     delete user.hashedPass;
     return user
}

function decorateSingleUser(user){
    if (user){
        user.offeredAsString=user.offered.map((instance)=>instance.title).join(', ');
        user.enrolledAsString=user.enrolled.map((instance)=>instance.title).join(', ');

    }
    
    
}

module.exports={login,register,verifyToken,enrollUser,assignInstanceToUser,findUserById};