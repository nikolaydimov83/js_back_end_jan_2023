const {getAll}=require('../services/instanceServices');

const closedInstanceController=require('express').Router();

closedInstanceController.get('/',async (req,res)=>{
    try {
        let instances= await getAll('Closed');
        instances=instances.filter((ins)=>ins.owner.toString()==req.userData._id.toString())
        
        res.render('closedInstances',{
            title:'Closed page',
            user:req.userData,
            instances
        })
    } catch (error) {
        res.redirect(`/details/${req.params.id}`);
    }
})

module.exports=closedInstanceController;