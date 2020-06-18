const jwt = require('jsonwebtoken');

var authenticateToken = function({include, exclude}, req, res, next) {
    let routePath = req.originalUrl;
    
    let isProtected = true;
    
    if (include && include.length > 0) {
      isProtected = false;
    }

    // include only
    if (include && include.length > 0) {
      for (let index = 0; index < include.length; index++) {
        const route = include[index];

        if (routePath.includes(route)){
          isProtected = true;

          break;
        }
      }
    }

    // exclude only
    if (exclude && exclude.length > 0) {
      for (let index = 0; index < exclude.length; index++) {
        const route = exclude[index];
        
        if (routePath.includes(route)){
          isProtected = false;

          break;
        }
      }
    }

    if (isProtected) {
      const authHeader = req.headers['authorization'];

      const token = authHeader && authHeader.split(' ')[1];
      
      if (token == null) return res.sendStatus(401)
    
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        
        if (err) return res.sendStatus(403);

        req.user = user

        next();
      });
    } else {
      next();
    }
}

module.exports = authenticateToken;