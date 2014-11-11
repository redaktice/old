var keys = require('../private/keys');
var User = require('../models/schemas/user');
var keys = require('../private/keys');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');

var facebookController = require('../api-actions/facebook-actions.js');
var twitterController = require('../api-actions/twitter-actions.js');
var authenticationController = require('./authentication.js');
var allAPIController = require('../api-actions/all-actions.js');
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
	console.log("REQUEST");
		facebookControl.writeStatus({user: req.user, status: "New #socialvibe #test"}, function(err, response) {
			console.log('New post response', response);
			res.send(response);
			// res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
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

// 			facebookControl.writeStatus({user: user, status: req.body.content}, function(err, response) {
// // console.log('New post response:', response);
// 				if (err) {
// 					console.log(err);
// 				}
// 	//*			
// 				res.send('done');
// 			});
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
	revibe: function(req, res) {

		var controller;
		var originalPostID = req.params.postID;
	console.log('originalPostID', originalPostID);
		var toMedia = req.params.media;

		switch (toMedia) {
			case 'facebook':
				controller = facebookController;
				break;
			case 'twitter':
				controller = twitterController;
		}

		var dbStatuses = req.user.posts;
		var originalPost = _.find(dbStatuses, function(dbPost) {
			return dbPost.postID === originalPostID;
		}); // = req.user.posts.id(originalPostID);
		// for (var i = 0; i < req.user.posts.length; i++) {
			// return req.user.posts[i]
		// };

		// console.log("USER", req.user);
		console.log("originalPost", originalPost);

		controller.writeStatus({user: req.user, status: req.body.content}, function(err, mediaResponse) {

			console.log("Post response ID:", mediaResponse);
			// originalPost.id(originalPostID) = mediaResponse;
			originalPost.media.facebook = mediaResponse;

			for (var i = 0; i < req.user.posts.length; i++) {
				if (req.user.posts[i].postID === originalPostID) {
					req.user.posts[i].media.facebook = mediaResponse;
				}
			}
			req.user.markModified('posts');
			req.user.save(function(err, user){
				if (err) {
					console.log('Database save error:', err);
				}
				allAPIController.updateStatus(req, function(updatedStatuses) {
					res.send(updatedStatuses);
				});
			});
		});


	//*/	
// 	async.auto({
// 			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
// 			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
// 		}, function(err, results){

// /*
//  res.send(results.twitter);
			
// /*/			
// 			var allPosts = results.facebook.concat(results.twitter);
// 			var organizedPosts = _.sortBy(allPosts, function(post) {
// 				return -1 * moment(post.postTime).valueOf();
// 			});
// 			var postIDArray = organizedPosts.map(function(post){
// 					return {postID: post.postID, media: post.mediaType};
// 			});
// 			req.user.posts = postIDArray;

// 			req.user.markModified('posts');
// 			req.user.save(function(err, user) {
// 				if (err) {
// 					console.log('Database save error:', err);
// 				}
// 			});

// 		var existingStatusQuery = req.user.posts;
// 		var unrenStatuses = [];
// 		for (var i = 0; i < recentStatusQuery.length; i++) {
// 			var statusMatch = _.find(existingStatusQuery, function(statusPost) {
// 				return statusPost === recentStatusQuery[i];
// 			});
// 			if (statusMatch) {

// 				// UPDATE THE POST OBJECT IN THE DATABASE HERE
// 				if(statusMatch.keys.length !== recentStatusQuery[i].keys.length) {

// 					_.extend(statusMatch, recentStatusQuery[i]);
// 					unrenStatuses.unshift(recentStatusQuery[i]);
// 				}
// 			} else {
// 				unrenStatuses.unshift(recentStatusQuery[i]);
// 			}
// 		}
// 		req.user.markModified('posts');
// 		req.user.save(function(err, user) {
// 			if (err) {
// 				console.log('Database save error:', err);
// 			}
// 		});
// 		res.send(unrenStatuses);
// 		});

		

// /*		
// 	res.send(twitterControl.getTwitterStatus.bind(null, req.user));
// /*/		User.findOne({uniqueURL: req.body.userID}, function(err, user) {
// 			if (err) {
// 				console.log("There was a facebook error", err);
// 			}
// 			async.auto({
// 				facebook: facebookControl.getFacebookStatus.bind(null, req.user),
// 				twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
// 			}, function(err, results){
// 	/*
// 	 res.send(results.twitter);

// 	/*/			var allPosts = results.facebook.concat(results.twitter);
// 				var organizedPosts = _.sortBy(allPosts, function(post) {
// 					return -1 * moment(post.postTime).valueOf();
// 				});
// 				// Concatenate the facebook and twitter data
// 				res.send(organizedPosts);
// //*/
// 			});
// 		});
		



	},
	updateStatus: function(req, res) {

		// var existingStatusQuery = req.user.posts;
		// var unrenStatuses = [];
		// for (var i = 0; i < recentStatusQuery.length; i++) {
		// 	var statusMatch = _.find(existingStatusQuery, function(statusPost) {
		// 		return statusPost === recentStatusQuery[i];
		// 	});
		// 	if (statusMatch) {

		// 		// UPDATE THE POST OBJECT IN THE DATABASE HERE
		// 		_.extend(statusMatch, recentStatusQuery[i]);
		// 	} else {
		// 		unrenStatuses.unshift(recentStatusQuery[i]);
		// 	}
		// }
		// req.user.markModified('posts');
		// req.user.save(function(err, user) {
		// 	if (err) {
		// 		console.log('Database save error:', err);
		// 	}
		// });
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