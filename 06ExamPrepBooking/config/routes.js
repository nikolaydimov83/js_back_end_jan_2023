const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const createHotelController=require("../controllers/createHotelController");
const editHotelController = require("../controllers/editHotelController");
const detailsController=require("../controllers/detailsController");
const deleteHotelController = require("../controllers/deleteController");
const bookHotelController = require("../controllers/bookHotelController");
const userController=require("../controllers/userController");

module.exports=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
    app.use('/add',createHotelController);
    app.use('/edit',editHotelController);
    app.use('/details',detailsController);
    app.use('/delete',deleteHotelController);
    app.use('/book',bookHotelController);
    app.use('/profile',userController);

}