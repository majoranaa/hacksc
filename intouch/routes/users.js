var express = require('express');
var router = express.Router();
var User = require('../model/user');
var UserTags = require('../model/u_tagmodel');

var user_fields = ['username', 'email']; //, 'major', 'school', 'year', 'resume'];
var usertags = [];


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
		var username = req.user.username;
		UserTags.find({'username':username}, function(err, tags) {
			if (err)
				return done(err);
			if (!tags) {
				console.log('No tags found for ' + username);
				req.flash('message', 'No tags found for ' + username + ' not found');
			}
			res.render('home', { user: req.user, login: req.isAuthenticated(), fields: user_fields, usertags: tags });
		});
	});

	router.get('/settings', function(req, res) {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
	} else {
		res.render('settings', { user: req.user, login: req.isAuthenticated() });
	}
	});

	router.get('/profile/:id', function(req, res) {
		if (req.isAuthenticated() && req.user.username == req.params.id) {
			res.redirect('/u/home');
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

	router.get('/addtag', function(req, res) {
		res.render('u_addtag', { user: req.user, message: req.flash('message')});
	});


	router.post('/addtag', function(req, res, next) {
		UserTags.create({
			username: req.user.username,
			tagName: req.body.tagName,
			email: req.body.email || '',
			firstName: req.body.firstName || '',
			lastName: req.body.lastName || '',
			phone: req.body.phone || '',
			address: req.body.address || '',
			major: '',
			school: '',
			year: '',
			resume: ''
		}, function(err) {
			if (err) res.send(err);
			res.redirect('/u/home');
		});
	});

	return router;
};
