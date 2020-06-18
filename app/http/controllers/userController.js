const jwt = require('jsonwebtoken');

class authController {
    /*
     * user authentication controller with JSON Web Token
    */
    constructor(user) {
        this.model = user;
    }

    //register new user
    list = async (req, res) => {
        try {
            const user = req.body

            var usersList = await this.model.findAll();

            res.status(200).send({
                'data':  usersList,
                'message': "new user register successfully."
            });
        } catch (e) {
            res.status(500).send({
                message: e.message || "Some error occurred while register new user."
            });
        } 
    };
}

module.exports = authController;
  