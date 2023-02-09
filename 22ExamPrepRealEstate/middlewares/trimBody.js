module.exports=()=>async (req,res,next)=>{
    if (req.body){
        let keys=Object.keys(req.body)
        keys.forEach((key)=>{
            req.body[key]=req.body[key].trim();
        })
    }

    next();
}