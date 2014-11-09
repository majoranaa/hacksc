var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    /* GET home page. */
    router.get('/', function(req, res) {
	res.render('index', { title: 'In Touch', login: req.isAuthenticated(), message: req.flash('message'), user: req.user });
    });

    router.get('/about', function(req, res) {
	res.render('about', { title: 'About Us', login: req.isAuthenticated(), user: req.user });
    });

    router.get('/peers', function(req, res) {
	res.render('peers', { title: 'Peers', login: req.isAuthenticated(), user: req.user });
    });

    router.get('/recruit', function(req, res) {
	res.render('recruit', { title: 'Recruiters', login: req.isAuthenticated(), user: req.user });
    });

    router.get('/contact', function(req, res) {
	res.render('contact', { title: 'Contact Us', login: req.isAuthenticated(), user: req.user });
    });

    router.get('/login', function(req, res) {
	if (req.isAuthenticated()) {
	    res.redirect('/home');
	} else {
	    res.render('login', { title: 'Login', login: req.isAuthenticated(), user: req.user, message: req.flash('message') });
	}
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/login',
	failureFlash : true  
    }));

    router.get('/register', function(req, res) {
	res.render('register', { title: 'Register', login: req.isAuthenticated(), message: req.flash('message'), user: req.user });
    });

    /* Handle Registration POST */
    router.post('/register', passport.authenticate('register', {
	successRedirect: '/home',
	failureRedirect: '/register',
	failureFlash : true  
    }));

    /* Handle Logout */
    router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
    });

    return router;
};
