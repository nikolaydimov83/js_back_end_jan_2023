const { getById } = require("../services/instanceServices");


const pathsReqOwnership=['edit','delete'];
const guestAllowedPaths=['auth','','catalog',`details`];



module.exports=()=>async (req,res,next)=>{
    const requestType=req.url.split('/')[1];
    
    if(req.userData!='No token'&&req.userData!='Invalid token'){
        res.locals.isLogged=true;

        const itemId=req.url.split('/')[2];
        let instance=await getById(itemId);
        if (instance){
            if ((req.userData._id.toString()!=instance.owner._id.toString())){
                res.locals.isOwner=false;

            }else{
                res.locals.isOwner=true;
            }
        }
        
        if (pathsReqOwnership.indexOf(requestType)>-1){
            
            if ((req.userData._id.toString()!=instance.owner._id.toString())){
                res.render('404')
                return
            }
        }
        next();
    }else{
        res.locals={isLogged:false,isOwner:false}
        
        if (guestAllowedPaths.includes(requestType)){
            if(req.url.split('/')[2]=='logout'){
                res.render('404');
                return
            }else{
                next();
            }
            
        }
        
        else{

            res.render('404');
        }
    }
}

