var keys = require('../private/keys');
var User = require('../models/schemas/user');


var authenticationController = {
	login: function(req, res) {
		res.render('login', {key: keys.facebookAppID});
	},
	attemptLogin: function(req, res, next) {

		return res.redirect('/sendToProfile');
	// });
	},
	sendToProfile: function(req, res) {
// console.log("Test");
		// Access database and get info
		console.log(req.user);
		res.render('profile', {user: req.user, key: keys.facebookAppID});
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/auth/login');
	}
};

module.exports = authenticationController;