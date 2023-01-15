const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const createHotelController=require("../controllers/createHotelController");
const editHotelController = require("../controllers/editHotelController");

module.exports=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
    app.use('/add',createHotelController);
    app.use('/edit',editHotelController);

}