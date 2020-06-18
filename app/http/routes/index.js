var express = require('express');
//middlewares
var { jwtProtected } = require('./../middleware');
class routes {
    constructor(baseUrl = '/api/'){
        this.baseUrl = baseUrl;
        this.router = express.Router();
        this.routeName = '';
        this.include = []; //include routes
        this.exclude = []; //exclude routes
    }

    routes = () => {
        // override in child class
    };

    protectRoute = (res, req, next) => jwtProtected({include: this.include, exclude: this.exclude}, res, req, next);

    get = (route, func) => this.router.get(this.baseUrl + this.routeName + route, func);
    post = (route, func) => this.router.post(this.baseUrl + this.routeName + route, func);
    put = (route, func) => this.router.put(this.baseUrl + this.routeName + route, func);
    del = (route, func) => this.router.delete(this.baseUrl + this.routeName + route, func);
}

module.exports = routes;