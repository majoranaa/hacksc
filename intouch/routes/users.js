var express = require('express');
var router = express.Router();
var User = require('../model/user');

module.exports = function(passport) {
    router.get('/:id', function(req, res) {
	if (req.isAuthenticated() && req.user.username == req.params.id) {
	    res.redirect('/home');
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
