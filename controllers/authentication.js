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

var authenticationController = {
	login: function(req, res) {
		res.render('login', {key: keys.facebookAppID});
	},
	// Generate a unique user URL and redirect to that URL
	attemptLogin: function(req, res, next) {
// console.log("USER", req.user);
		// signedIn.facebook = true;
		res.redirect('/auth/sendToProfile/' + req.user.uniqueURL);
	},
	// Grab all of the Facebook status information and render the user's profile
	sendToProfile: function(req, res) {
/*		
	res.send(twitterControl.getTwitterStatus.bind(null, req.user));
	/*/	async.auto({
			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
		}, function(err, results){

/*
 res.send(results.twitter);

/*/			var allPosts = results.facebook.concat(results.twitter);
			var organizedPosts = _.sortBy(allPosts, function(post) {
				return -1 * moment(post.postTime).valueOf();
			});
			// Concatenate the facebook and twitter data
			res.render('profile', {user: req.user, userData: organizedPosts});

//*/

		});

// console.log("Test");

		// if (!signedIn.twitter) {
		// 	facebookControl.getStatus(req.user, function(err, response) {
		// 		res.render('profile', {user: req.user, key: keys.facebookAppID, facebookStatus: response});
		// 	});
		// }
		// if(signedIn.twitter) {
		// 	facebookControl.getStatus(req.user, function(err, response) {
		// 		twitterControl.getHomeTimeline(req.user, function(err, result) {
		// 			res.render('profile', {
		// 				user: req.user,
		// 				key: keys.facebookAppID,
		// 				facebookStatus: response,
		// 				twitterTimeline: result
		// 			});
		// 		});
		// 	});
		// }
	},
	displayStatus: function(req, res) {
		facebookControl.getStatus(req.user, function(err, response) {
			res.send(response);
		});
	},
	displayTwitterTime: function (req, res) {
		twitterControl.getHomeTimeline(req.user, function(err, result) {
			res.send(result);
		});
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/auth/login');
	},
	createPost: function(req, res) {
		facebookControl.writeStatus(req.user, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	},
	createTweet: function(req, res) {
		twitterControl.newTweet(req.user, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	}
};

module.exports = authenticationController;