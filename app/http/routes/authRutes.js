var routes = require('./index');
var authController = require('./../controllers/authController');

class authRoutes extends routes {
    constructor(auth) {
        super(); // run parant class constructor

        this.controller = new authController(auth); //pass auth model to auth controller
        this.routeName = "auth/";
        this.include = ['logout']; //only include routes protected 
    }

    routes = (app) => {
        //login route
        this.post('login', this.controller.login);
            
        //get refresh route
        this.post('refresh-token', this.controller.refreshToken);

        //register new user route
        this.post('register', this.controller.register);

        //logout route
        this.get('logout', this.controller.logout);

        app.use('/', this.protectRoute, this.router);
    };
}

module.exports = authRoutes;