const bcrypt=require('bcrypt')

async function hash(password){
    return bcrypt.hash(password,10)
}

async function compare(password,hashedPass){
    return bcrypt.compare(password,hashedPass)
}

module.exports={hash,compare}