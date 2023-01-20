const { getById } = require("../services/instanceServices");


const pathsReqOwnership=['edit','delete'];
const guestAllowedPaths=['auth','','catalog',`details`];
const userForbiddenPaths=['auth'];



module.exports=()=>async (req,res,next)=>{
    const requestType=req.url.split('/')[1];
    //Checks whether user has logged in
    if(req.userData!='No token'&&req.userData!='Invalid token'){
        res.locals.isLogged=true;
        //searches for item ID in the request. Might find вложен път, not id
        const itemId=req.url.split('/')[2];
        let instance=await getById(itemId);
        //Depending on whether the instance and the user owners are the same sets isOwner global variable
        if (instance){
            if ((req.userData._id.toString()!=instance.owner._id.toString())){
                res.locals.isOwner=false;

            }else{
                res.locals.isOwner=true;
            }
        }
        //checks if the specific path requires ownership
        if (pathsReqOwnership.indexOf(requestType)>-1){
            //if the path requires ownership but no instanse was found
            if(!instance){
                res.render('404');
                return
            }
            //if the path requires ownership but the instance has different owner than the requstor ID
            if ((req.userData._id.toString()!=instance.owner._id.toString())){
                res.render('404')
                return
            }
            
            


        }
        //if the path is forbidden to logged user
        if (userForbiddenPaths.includes(requestType)){
            if(req.url.split('/')[2]!='logout'){
                res.render('404');
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

