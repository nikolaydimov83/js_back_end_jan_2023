const { readHotelById } = require("../services/hotelServices");

const guestAllowedPaths=['/auth/login','/','/auth/register'];
const pathsReqOwnership=['edit','delete'];




module.exports=()=>async (req,res,next)=>{
    if(req.userData!='No token'&&req.userData!='Invalid token'){
        res.locals.isLogged=true;
        const requestType=req.url.split('/')[1];
        const itemId=req.url.split('/')[2];
        let hotel=await readHotelById(itemId);
        if (hotel){
            if ((req.userData._id.toString()!=hotel.owner._id.toString())){
                res.locals.isOwner=false;

            }else{
                res.locals.isOwner=true;
            }
        }
        
        if (pathsReqOwnership.indexOf(requestType)>-1){
            
            if ((req.userData._id.toString()!=hotel.owner._id.toString())){
                res.redirect('/');
                return
            }
        }
        next();
    }else{
        res.locals={isLogged:false,isOwner:false}
        if (guestAllowedPaths.includes(req.url)){
            next();
        }else{
            res.redirect('/auth/login');
        }
    }
}

