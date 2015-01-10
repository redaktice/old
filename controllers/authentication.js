var keys = require('../getKeys');
var User = require('../models/schemas/user');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');


var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');
var allAPIController = require('../api-actions/all-actions.js');




// Function called when the user does not have a media
//  or is not signed-in to the media
var noAccount = function(callback) {
	callback(null, []);
};

var authenticationController = {
	login: function(req, res) {
		res.render('login' /*, {key: keys.facebookAppID}*/);
	},
	// Generate a unique user URL and redirect to that URL
	attemptLogin: function(req, res, next) {
// console.log("USER", req.user);
		// signedIn.facebook = true;
		res.redirect('/auth/sendToProfile/' + req.user.uniqueURL);
	},
	// Grab all of the Facebook status information and render the user's profile
	sendToProfile: function(req, res) {

		var referenceTime = moment().valueOf();

		allAPIController.updateStatus({user: req.user, referenceTime: referenceTime, renderAll: true}, function(statusArray){
			res.render('profile', {user: req.user, renderedPosts: statusArray});
		});
	},
		// Grab all of the Facebook status information and render the user's profile
	showStatuses: function(req, res) {
/*		
	res.send(twitterControl.getTwitterStatus.bind(null, req.user));
	/*/	async.auto({
			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
		}, function(err, results){

/*
 res.send(results.twitter);
			
/*/			
			var allPosts = results.facebook.concat(results.twitter);
			var organizedPosts = _.sortBy(allPosts, function(post) {
				return -1 * moment(post.creationTime).valueOf();
			});
			req.user.statuses = statusIDArray;

			req.user.markModified('posts');
			req.user.save(function(err, user) {
				if (err) {
					console.log('Database save error:', err);
				}
			});

			// Concatenate the facebook and twitter data
			res.send(organizedPosts);
//*/
		});

	},

	logout: function(req, res) {
		req.logout();
		res.redirect('/auth/login');
	}
};

module.exports = authenticationController;