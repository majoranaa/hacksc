var express = require('express');
var router = express.Router();
var User = require('../model/user');

var user_fields = ['username', 'email', 'firstName', 'lastName', 'phone', 'address']; //, 'major', 'school', 'year', 'resume'];


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
    router.get('/home', isAuthenticated, function(req, res){
	res.render('home', { user: req.user, login: req.isAuthenticated(), fields: user_fields });
    });

    router.get('/settings', function(req, res) {
	if (!req.isAuthenticated()) {
	    res.redirect('/login');
	} else {
	    res.render('settings', { user: req.user, login: req.isAuthenticated() });
	}
    });

    router.get('/:id', function(req, res) {
	if (req.isAuthenticated() && req.user.username == req.params.id) {
	    res.redirect('/c/home');
	} else {
	    var username = req.params.id;
	    User.findOne({'username':username},
			 function(err, user) {
			     if (err)
				 return done(err);
			     if (!user) {
				 console.log('User Not Found with username ' + username);
				 req.flash('message', 'User ' + username + ' not found');
			     }
			     res.render('user', { id: req.params.id, login: req.isAuthenticated(), message: req.flash('message'), user: req.user });
			 });
	}
    });
    
    return router;
};
