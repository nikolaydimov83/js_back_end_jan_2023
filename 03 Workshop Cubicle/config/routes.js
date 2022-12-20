const homeController=require('../controllers/homeController');
const aboutController=require('../controllers/aboutController');
const detailsController=require('../controllers/detailsController');
const createController=require('../controllers/createController');
const errorController=require('../controllers/errorController');
const attachAccesoaryController=require('../controllers/attachAccesoryController');
const registerController=require('../controllers/registerController');
const loginController=require('../controllers/loginController');
module.exports = (app) => {
    app.use('/',homeController);
    app.use('/about',aboutController);
    
    app.use('/details',detailsController);
    app.use('/create',createController);
    app.use('/attach',attachAccesoaryController);
    app.use('/register',registerController);
    app.use('/login',loginController);
    app.use('*',errorController);
    

};