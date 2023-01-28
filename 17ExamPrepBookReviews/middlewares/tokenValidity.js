const { verifyToken } = require("../services/userServices");


module.exports=()=>async (req,res,next)=>{
    //const token=req.cookies.token;
    const userData=await verifyToken(req,res);

        req.userData=userData;
        next();

}