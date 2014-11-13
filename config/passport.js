var keys = require('../getKeys');
var passport = require('passport');
var User = require('../models/schemas/user');
// Get the Facebook Passport Strategy
var facebookStrategy = require('./facebookStrategy.js');
var twitterStrategy = require('./twitterStrategy.js');


// Passport serialization
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// Login using Facebook
passport.use(facebookStrategy);


// Twitter Passport Strategy Instance
passport.use(twitterStrategy);

module.exports = {
	ensureAuthentication: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/login');
	}
};