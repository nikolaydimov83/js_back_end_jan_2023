const { verifyToken } = require("../services/userServices");


module.exports=()=>async (req,res,next)=>{
    const token=req.cookies.token;
    const userData=await verifyToken(req,res);
    if (userData){
        req.userData=userData
        next();
    }else if(userData==='Invalid token'){
        res.clearCookie('token');
        res.render('login')
        
    }
}