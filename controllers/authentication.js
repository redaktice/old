var keys = require('../private/keys');
var User = require('../models/schemas/user');
var facebookAPI = require('../api-actions/facebook-actions.js');
var keys = require('../private/keys');

var authenticationController = {
	login: function(req, res) {
		res.render('login', {key: keys.facebookAppID});
	},
	// Generate a unique user URL and redirect to that URL
	attemptLogin: function(req, res, next) {
	console.log("USER", req.user);
		var uniqueUser = req.user.profile.name.familyName + '.' + req.user.profile.name.givenName + '.' + req.user.vibeID;
		res.redirect('/auth/sendToProfile/' + uniqueUser);
	},

	// Grab all of the Facebook status information and render the user's profile
	sendToProfile: function(req, res) {
console.log("Test");

		facebookAPI.getStatus(req.user, function(err, response) {
			res.render('profile', {user: req.user, key: keys.facebookAppID, status: response});
		});

	},
	displayStatus: function(req, res) {
		facebookAPI.getStatus(req.user, function(err, response) {
			res.send(response);
		});
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/auth/login');
	}
};

module.exports = authenticationController;