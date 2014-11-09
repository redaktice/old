var keys = require('../private/keys');
var User = require('../models/schemas/user');
var keys = require('../private/keys');
var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');

// var signedIn = {
// 	facebook: false,
// 	twitter: true,
// };


// Function called when the user does not have a media
//  or is not signed-in to the media
var noAccount = function(callback) {
	callback(null, []);
};

var statusController = {
	displayStatus: function(req, res) {
		facebookControl.showFacebookStatus(req.user, function(err, response) {
			res.send(response);
		});
	},
	displayTwitterTime: function (req, res) {
		twitterControl.showTwitterStatus(req.user, function(err, result) {
			res.send(result);
		});
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/auth/login');
	},
	createPost: function(req, res) {
		facebookControl.writeStatus({user: req.user, status: "New Status #socialvibe #test"}, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	},
	createTweet: function(req, res) {
		twitterControl.newTweet({user: req.user, tweet: "@PeterSaidThis New Tweet #socialvibe"}, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	}
};

module.exports = statusController;