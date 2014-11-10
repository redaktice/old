var keys = require('../private/keys');
var User = require('../models/schemas/user');
var keys = require('../private/keys');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');

var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');
var authenticationController = require('./authentication.js');
var apiController = require('./apiController.js');
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
	createPost: function(req, res) {
		facebookControl.writeStatus({user: req.user, status: "New Status #socialvibe #test"}, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	},
	createTweet: function(req, res) {
		twitterControl.newTweet({user: req.user, tweet: "@PeterSaidThis New Tweet #socialvibe"}, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	},
	updateFacebook: function(req, res) {
		console.log('Request', req.body);

		User.findOne({uniqueURL: req.body.userID}, function(err, user) {
			if (err) {
				console.log("Facebook had trouble finding the user error", err);
			}

			facebookControl.writeStatus({user: user, status: req.body.content}, function(err, response) {
// console.log('New post response:', response);
				if (err) {
					console.log(err);
				}
	//*			
				res.send('done');
			});
				// res.send('auth/sendToProfile/' + user.uniqueURL);
	
	/*/			facebookControl.updateStatus({user: user, content: req.body.content}, function(err, newStatusPost) {
					if (err) {
						console.log(err);
					}
		console.log('New post:', newStatusPost);
					apiController.pushFacebook({user: user, postID: req.body.postID, facebookID: newStatusPost.postID}, function(err, confirmation){
					});
						res.send(newStatusPost);
					// return (newStatusPost);
	
				});		
			});
		//*/
		});
	},
	updateStatus: function(req, res) {
/*		
	res.send(twitterControl.getTwitterStatus.bind(null, req.user));
/*/		User.findOne({uniqueURL: req.body.userID}, function(err, user) {
			if (err) {
				console.log("There was a facebook error", err);
			}
			async.auto({
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
				res.send(organizedPosts);
//*/
			});
		});
	},




	// FOR TESTING ONLY
			displayStatus: function(req, res) {
				facebookControl.showFacebookStatus(req.user, function(err, response) {
					res.send(response);
				});
			},
			displayTwitterTime: function (req, res) {
				twitterControl.showTwitterStatus(req.user, function(err, result) {
					res.send(result);
				});
			}
};

module.exports = statusController;