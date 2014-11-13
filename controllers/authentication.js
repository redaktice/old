var keys = require('../getKeys');
var User = require('../models/schemas/user');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');


var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');
var allAPIController = require('../api-actions/all-actions.js');

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

		var referenceTime = moment().valueOf();

		allAPIController.updateStatus({user: req.user, referenceTime: referenceTime, renderAll: true}, function(statusArray){
			res.render('profile', {user: req.user, renderedPosts: statusArray});
		});

// 		console.log('Update User', req.user);
// 		async.auto({
// 			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
// 			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
// 		}, function(err, results){

// 			// Combine all the posts from media and organize by date
// 			var allPosts = results.facebook.concat(results.twitter);
// 			var organizedPosts = _.sortBy(allPosts, function(post) {
// 				return -1 * moment(post.postTime).valueOf();
// 			});
// 			var dbStatuses = req.user.posts;

// 			if (dbStatuses.length === 0) {
// 				res.render('profile', {user: req.user, renderedPosts: organizedPosts});
// 			}
// else {
// 		var unrenStatuses = dbStatuses.map(function(dbPost) {
// 				var result;
// 				var fbMatch = _.find(results.facebook, function(fbPost) {
// 					return fbPost.postID === dbPost.media.facebook;
// 				});
// 				if (fbMatch) {
// 					result = fbMatch;
// 					result.mediaType.facebook = fbMatch.postID;
// 				}

// 				var twMatch = _.find(results.twitter, function(twPost) {
// 					return twPost.postID === dbPost.media.twitter;
// 				});

// 				if (twMatch) {
// 					if (!result) {
// 					result = twMatch;
// 					}
					
// 				result.mediaType.twitter = twMatch.postID;
// 				}

// 	console.log('Update result', result);
// 				return result;
// 			});

// 			// Create a simplified of array of IDs and media sources
// 	// 		var postIDArray = organizedPosts.map(function(post){
// 	// 				return {postID: post.postID, media: post.mediaType};
// 	// 		});

// 	// 		var recentStatusQuery = organizedPosts;
// 	// 		// Compare the list of post IDs in the database
// 	// 		//  to the most recent query
// 	// 		var dbStatuses = req.user.posts;
// 	// 		var unrenStatuses = [];

// 	// 		for (var i = 0; i < recentStatusQuery.length; i++) {
// 	// 		// }
			
// 	// 		// for (var i = 0; i < recentStatusQuery.length; i++) {

// 	// 			// Locate any posts already in the database
// 	// 			var statusMatch = _.find(dbStatuses, function(statusPost) {
// 	// 		console.log("statusPost - id check", statusPost);
// 	// 		console.log("recent post - id check", recentStatusQuery[i]);
// 	// 				return statusPost.postID === recentStatusQuery[i].postID;
// 	// 			});

// 	// // console.log("Status Match", statusMatch);
// 	// 			// Update any matched statuses
// 	// 			if (statusMatch) {
// 	// 				if(statusMatch.mediaType.facebook !== recentStatusQuery[i].mediaType.facebook) {

// 	// 					_.extend(statusMatch, recentStatusQuery[i]);
// 	// 					unrenStatuses.unshift(recentStatusQuery[i]);
// 	// console.log("Status Match", statusMatch);
// 	// 				}
// 	// 			} 
// 	// 			else {
// 	// 				unrenStatuses.unshift(recentStatusQuery[i]);
// 	// 				req.user.posts.unshift(recentStatusQuery[i]);
// 	// 			}
// 	// 		}
// 	// 		// Save any changes made to the list of
// 	// 		//  posts in the database
// 	// 		req.user.markModified('posts');
// 	// 		req.user.save(function(err, user) {
// 	// 			if (err) {
// 	// 				console.log('Database save error:', err);
// 	// 			}
// 	// 		});
// 			// Send back the new or changed posts
// 			var allNewPosts = _.compact(unrenStatuses);
// 			var organizedNewPosts = _.sortBy(allNewPosts, function(post) {
// 				return -1 * moment(post.postTime).valueOf();
// 			});
// 			res.render('profile', {user: req.user, renderedPosts: organizedPosts});
// 		}
	



	// });

		// allAPIController.updateStatus(req, function(userStatuses){
		// 	res.render('profile', {user: req.user, renderedPosts: userStatuses});
		// });
// /*		
// 	res.send(twitterControl.getTwitterStatus.bind(null, req.user));
// 	/*/	async.auto({
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

// 			// Concatenate the facebook and twitter data
// 			res.render('profile', {user: req.user, renderedPosts: organizedPosts});

// //*/

// 		});

		// async.auto({
		// 	facebook: facebookControl.getFacebookStatus.bind(null, req.user),
		// 	twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
		// }, function(err, results){

		// 		var fbStatuses = results.facebook;
		// 		var twStatuses = results.twitter;
		// 		var allDBposts = req.user.posts;

		// 		var sharedStatuses = [];
		// 		for (var i = 0; i < req.user.posts.length; i++) {
		// 			if (req.user.posts[i].media.facebook && req.user.posts[i].media.facebook) {
		// 				sharedStatuses.push(req.user.posts[i]);
		// 			}
		// 		}
		// 		// var sharedStatuses = _.filter(req.user.posts, function(dbStatus){
		// 		// 	return (dbStatus.media.facebook && dbStatus.media.twitter);
		// 		// });

		// 		sharedStatuses.map(function(dbSharedStatus){
		// 		/*----------------Look for Statuses that originally came from Facebook------------------*/
		// 			for (var j = 0; j < dbSharedStatus.length; j++) {

		// 				// If the sharedStatus postID matches a postID from Facebook
		// 				if (dbSharedStatus.postID === fbStatuses[j].postID) {

		// 					// Remove the corresponding Twitter post from
		// 					// the Twitter array of posts to be rendered (avoid duplicates)
		// 					_.reject(twStatuses, function(status) {
		// 						return (status.postID === dbSharedStatus.media.twitter);
		// 					});

		// 					// Assign a Twitter property to the Facebook status to be rendered
		// 					fbStatuses[j].mediaType.twitter = dbSharedStatus.media.twitter;
		// 				}
		// 			}

		// 		/*----------------Look for Statuses that originally came from Twitter------------------*/
		// 			for (var k = 0; k < dbSharedStatus.length; k++) {
		// 				// If the sharedStatus postID matches a postID from Twitter
		// 				if (dbSharedStatus.postID === twStatuses[k].postID) {

		// 					// Remove the corresponding Facebook post from
		// 					// the Facebook array of posts to be rendered (avoid duplicates)
		// 					_.reject(fbStatuses, function(status) {
		// 						return (status.postID === dbSharedStatus.media.facebook);
		// 					});

		// 					// Assign a Facebook property to the Twitter status to be rendered
		// 					twStatuses[k].mediaType.facebook = dbSharedStatus.media.facebook;
		// 				}
		// 			}
		// 		});
		// 		var allStatuses = fbStatuses.concat(twStatuses);
		// 		var organizedPosts = _.sortBy(allStatuses, function(post) {
		// 			return -1 * moment(post.postTime).valueOf();
		// 		});

		// 		console.log('Organized Posts', organizedPosts);

		// 		var postIDArray = organizedPosts.map(function(post){
		// 			return {postID: post.postID, source: post.source, media: post.mediaType};
		// 		});
		// 		req.user.posts = postIDArray;
		// 		req.user.markModified('posts');
		// 		req.user.save(function(err, user) {
		// 			if (err) {
		// 				console.log('Database save error:', err);
		// 			}
		// 		});
		// 	res.render('profile', {user: req.user, renderedPosts: organizedPosts});
		// });
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
				return -1 * moment(post.postTime).valueOf();
			});
			req.user.posts = postIDArray;

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