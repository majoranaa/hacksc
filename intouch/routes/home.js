var express = require('express');
var router = express.Router();

var user_fields = ['username', 'email', 'phone', 'firstName', 'lastName', 'address', 'major', 'school', 'year', 'resume'];

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = function(passport) {
    /* GET Home Page */
    router.get('/', isAuthenticated, function(req, res){
	res.render('home', { user: req.user, login: req.isAuthenticated(), fields: user_fields });
    });

    router.get('/settings', function(req, res) {
	if (!req.isAuthenticated()) {
	    res.redirect('/login');
	} else {
	    res.render('settings', { user: req.user, login: req.isAuthenticated() });
	}
    });

    return router;
};
