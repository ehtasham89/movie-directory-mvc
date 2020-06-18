const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { cache } = require( "./../../services" );

class authController {
    /*
     * user authentication controller with JSON Web Token
    */
    constructor(users) {
        this.model = users;
        this.appCache = new cache(process.env.CACHE_TIME || 3600);
        this.refreshTokenCache = "jwtRefreshTokens";
        this.tokenExpiry = '1800s';

        //refresh token for retrive access token
        this.refreshTokens = [this.appCache.get(this.refreshTokenCache)];
    }

    //get new access token with refresh token
    refreshToken = (req, res) => {
        try {
            const refreshToken = req.body.token

            if (refreshToken == null) return res.sendStatus(401);

            if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)

                const accessToken = this.generateAccessToken(user)

                res.json({ accessToken: accessToken })
            });
        } catch (e) {
            res.sendStatus(500);
        }
    };

    //register new user
    register = async (req, res) => {
        try {
            const user = req.body

            await this.model.create(user);

            res.status(200).send("new user register successfully.");
        } catch (e) {
            res.status(500).send({
                message: e.message || "Some error occurred while register new user."
            });
        } 
    };

    //delete token refresh token and access token
    logout = (req, res) => {
        this.appCache.del(this.refreshTokenCache);

        res.sendStatus(204);
    };

    //login to get access token and refresh token
    login = (req, res) => {
        // Authenticate User
        try {
            const username = req.body.username

            this.model.findOne({ where: { username: username } }).then(data => {
                if (data && data.username && req.body.password && data.password) {
                    const user = {username: data.username, email: data.email};

                    bcrypt.compare(req.body.password, data.password, (err, bcryptRes) => {
                        if (!bcryptRes) {
                            res.status(400).send('password does not match, try again');
                        } else {
                            const accessToken = this.generateAccessToken(user);
                            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                            
                            this.appCache.set(this.refreshTokenCache, refreshToken);
            
                            res.json({ accessToken: accessToken, refreshToken: refreshToken , user});
                        }
                    });
                } else {
                    res.status(400).send('Cannot find user')
                }
            }).catch(err => {
                res.status(400).send({
                    message: err.message || "Some error occurred while retriving user data."
                });
            });
        } catch (e) {
            res.status(500).send({
                message: e.message || "Some error occurred while login user."
            });
        } 
    };

    //generate new access token
    generateAccessToken = (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: this.tokenExpiry })
    }
}

module.exports = authController;
  