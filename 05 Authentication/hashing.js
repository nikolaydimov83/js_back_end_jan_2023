const bcrypt=require('bcrypt')

async function hashPass(password){
    return bcrypt.hash(password,10)
}

async function comparePass(password,hashedPass){
    return bcrypt.compare(password,hashedPass)
}

module.exports={hashPass,comparePass}