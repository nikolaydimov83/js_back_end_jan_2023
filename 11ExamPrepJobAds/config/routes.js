const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const createInstanceController=require("../controllers/createInstanceController");
const editHotelController = require("../controllers/editInstanceController");
const detailsController=require("../controllers/detailsController");
const deleteHotelController = require("../controllers/deleteController");
const enrollInstanceController = require("../controllers/enrollInstanceController");
const userController=require("../controllers/userController");
const searchController=require("../controllers/searchController");
const closeInstanceController = require("../controllers/closeInstanceController");
const closedInstanceController = require("../controllers/closeDDInstanceController");

module.exports=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
    app.use('/create',createInstanceController);
    app.use('/edit',editHotelController);
    app.use('/details',detailsController);
    app.use('/delete',deleteHotelController);
    app.use('/enroll',enrollInstanceController);
    app.use('/profile',userController);
    app.use('/search',searchController);
    app.use('/close',closeInstanceController);
    app.use('/closed',closedInstanceController);
    app.use('*',(req,res)=>res.render('404'));

}