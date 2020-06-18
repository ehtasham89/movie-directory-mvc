var routes = require('./index');
var userController = require('./../controllers/userController');

class userRoutes extends routes {
    constructor(user) {
        super(); // run parant class constructor

        this.controller = new userController(user); //pass auth model to auth controller
        this.routeName = "users/";
    }

    routes = (app) => {
        //login route
        this.get('', this.controller.list);

        app.use('/', this.protectRoute, this.router);
    };
}

module.exports = userRoutes;