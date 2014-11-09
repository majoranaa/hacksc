var express = require('express');
var router = express.Router();

var CompanyConnections = require('../model/c_connections');
var UserTags = require('../model/u_tagmodel');

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

    router.get('/addtag', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect((req.user.is_comp?'/c':'/u') + '/addtag');
    } else {
        res.render('login', { title: 'Login', login: req.isAuthenticated(), user: req.user, message: req.flash('message') });
    }
    });

    router.get('/landing', function(req, res) {
        var username = req.user.username;
        UserTags.find({'username':username,'tagName':'default'}, function(err, tags) {
            if (err)
                return done(err);
            if (!tags) {
                console.log('No tags found for ' + username);
                req.flash('message', 'No tags found for ' + username + ' not found');
            }
            console.log(tags[0]);
            res.render('landing', { title: 'HackSC', user: req.user, message: req.flash('message'), defTag: tags[0] || {} });
        });
    });

    router.post('/landing', function(req, res, next) {
        CompanyConnections.create({
            m_username: 'HackSC',
            tagName: 'hackathon',
            username: req.user.username || '',
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
            res.redirect('/connections');
        });
    });

    router.get('/connections', function(req, res) {
        var username = req.user.username;
        CompanyConnections.find({'m_username':username}, function(err, tags) {
            if (err)
                return done(err);
            if (!tags) {
                console.log('No tags found for ' + username);
                req.flash('message', 'No tags found for ' + username + ' not found');
            }
            res.render('connections', { user: req.user, login: req.isAuthenticated(), users: tags });
        });
    });

    router.get('/login', function(req, res) {
	if (req.isAuthenticated()) {
	    res.redirect((req.user.is_comp?'/c':'/u') + '/home');
	} else {
	    res.render('login', { title: 'Login', login: req.isAuthenticated(), user: req.user, message: req.flash('message') });
	}
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
	successRedirect: '/login',
	failureRedirect: '/login',
	failureFlash : true  
    }));

    router.get('/register', function(req, res) {
	if (req.isAuthenticated()) {
	    res.redirect((req.user.is_comp?'/c':'/u') + '/home');
	} else {
	    res.render('register', { title: 'Register', login: req.isAuthenticated(), message: req.flash('message'), user: req.user });
	}
    });

    /* Handle Registration POST */
    router.post('/register', passport.authenticate('register', {
	successRedirect: '/register',
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
