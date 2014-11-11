var _ = require('underscore');
var moment = require('moment');
var async = require('async');


var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');


var allAPIController = {

	updateStatus: function (req, callback) {

		console.log('Update User', req.user);
		async.auto({
			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
		}, function(err, results){

			// Combine all the posts from media and organize by date
			var allPosts = results.facebook.concat(results.twitter);
			var organizedPosts = _.sortBy(allPosts, function(post) {
				return -1 * moment(post.postTime).valueOf();
			});
			var dbStatuses = req.user.posts;

		var unrenStatuses = dbStatuses.map(function(dbPost) {
				var result;
				var fbMatch = _.find(results.facebook, function(fbPost) {
					return fbPost.postID === dbPost.media.facebook;
				});
				if (fbMatch) {
					result = fbMatch;
					result.mediaType.facebook = fbMatch.postID;
				}

				var twMatch = _.find(results.twitter, function(twPost) {
					return twPost.postID === dbPost.media.twitter;
				});

				if (twMatch) {
					if (!result) {
					result = twMatch;
					}
					
				result.mediaType.twitter = twMatch.postID;
				}

	console.log('Update result', result);
				return result;
			});

			// Create a simplified of array of IDs and media sources
	// 		var postIDArray = organizedPosts.map(function(post){
	// 				return {postID: post.postID, media: post.mediaType};
	// 		});

	// 		var recentStatusQuery = organizedPosts;
	// 		// Compare the list of post IDs in the database
	// 		//  to the most recent query
	// 		var dbStatuses = req.user.posts;
	// 		var unrenStatuses = [];

	// 		for (var i = 0; i < recentStatusQuery.length; i++) {
	// 		// }
			
	// 		// for (var i = 0; i < recentStatusQuery.length; i++) {

	// 			// Locate any posts already in the database
	// 			var statusMatch = _.find(dbStatuses, function(statusPost) {
	// 		console.log("statusPost - id check", statusPost);
	// 		console.log("recent post - id check", recentStatusQuery[i]);
	// 				return statusPost.postID === recentStatusQuery[i].postID;
	// 			});

	// // console.log("Status Match", statusMatch);
	// 			// Update any matched statuses
	// 			if (statusMatch) {
	// 				if(statusMatch.mediaType.facebook !== recentStatusQuery[i].mediaType.facebook) {

	// 					_.extend(statusMatch, recentStatusQuery[i]);
	// 					unrenStatuses.unshift(recentStatusQuery[i]);
	// console.log("Status Match", statusMatch);
	// 				}
	// 			} 
	// 			else {
	// 				unrenStatuses.unshift(recentStatusQuery[i]);
	// 				req.user.posts.unshift(recentStatusQuery[i]);
	// 			}
	// 		}
	// 		// Save any changes made to the list of
	// 		//  posts in the database
	// 		req.user.markModified('posts');
	// 		req.user.save(function(err, user) {
	// 			if (err) {
	// 				console.log('Database save error:', err);
	// 			}
	// 		});
			// Send back the new or changed posts
			var allNewPosts = _.compact(unrenStatuses);
			var organizedNewPosts = _.sortBy(allNewPosts, function(post) {
				return -1 * moment(post.postTime).valueOf();
			});
			callback(organizedNewPosts);
		});
	},

};
module.exports = allAPIController;