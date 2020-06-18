//all routes
var authRouter = require('./http/routes/authRutes');
var userRouter = require('./http/routes/userRoutes');
//models
var db = require("./models");

//app init
var init = function(app, port) {
    var users = db.users || {}; //assign empty object if user model not found

    //default route
     app.get('/', (req, res) => {
        res.json(`App server running on port: ${port}!`)
    });

    //login | register | logout | JWT routes
    (new authRouter(users)).routes(app);

    //========= Protected Routes with JWT =========\\
    //user routes
    (new userRouter(users)).routes(app);

    db.sequelize.sync(); //sync({force: process.env.NODE_ENV === "development"})
}

module.exports = init;