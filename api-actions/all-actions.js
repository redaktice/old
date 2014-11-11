var _ = require('underscore');
var moment = require('moment');
var async = require('async');


var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');


var allAPIController = {

	/**
	 * Updates the profile feed
	 * @param  {AJAX}   req      the user signed into the application
	 * @param  {Function} callback executed after finding new/altered posts
	 * @return {Array}            List of new/altered posts for rendering
	 */
	updateStatus: function (req, callback) {

		console.log('Update User', req.user);
		async.auto({
			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
		}, function(err, results){

				// Combine all the posts from media and organize by date
				// var allPosts = results.facebook.concat(results.twitter);
				// var organizedPosts = _.sortBy(allPosts, function(post) {
				// 	return -1 * moment(post.postTime).valueOf();
				// });
			var allStatuses = results.facebook.concat(results.facebook);
				var organizedPosts = _.sortBy(allStatuses, function(post) {
					return -1 * moment(post.postTime).valueOf();
				});

				console.log('Organized Posts', organizedPosts);

				var postIDArray = organizedPosts.map(function(post){
					return {postID: post.postID, media: post.mediaType};
				});




				var dbStatuses = req.user.posts;


				var updatedStatuses = dbStatuses.map(function(dbPost) {
					var resultingPost;

					// Look for THIS postID from the databse
					// ALSO in the Facebook response
					var fbMatch = _.find(results.facebook, function(fbPost) {
						return fbPost.postID === dbPost.media.facebook;
					});
					if (fbMatch) {
						resultingPost = fbMatch;
						resultingPost.mediaType.facebook = fbMatch.postID;
					}

					// Look for THIS postID from the databse
					// ALSO in the Twitter response
					var twMatch = _.find(results.twitter, function(twPost) {
						return twPost.postID === dbPost.media.twitter;
					});

					// If THIS database postID exists in the Twitter response:
					if (twMatch) {

						// If THIS database postID is ALSO
						//  in the Facebook response:
						if (!resultingPost) {

							// Use the Twitter response if there is
							// NO matching Facbook response
							resultingPost = twMatch;
						}
						// Update the media property in the Facebook response
						// and use the Facebook response
						resultingPost.mediaType.twitter = twMatch.postID;
						postIDArray[dbStatuses.indexOf(dbPost)].media.twitter = twMatch.postID;

					}

		console.log('Update result', resultingPost);
					return resultingPost;
				});

			// Send back the organized new/changed posts
			// Remove null entries in the array from the map
			var allUpdatedStatuses = _.compact(updatedStatuses);
			var organizedNewPosts = _.sortBy(allUpdatedStatuses, function(post) {
				return 1 * moment(post.postTime).valueOf();
			});

			// Create a simplified of array of IDs and media sources
	// 		var postIDArray = organizedPosts.map(function(post){
	// 				return {postID: post.postID, media: post.mediaType};
	// 		});

	// 		var recentStatusQuery = organizedPosts;
	// 		// Compare the list of post IDs in the database
	// 		//  to the most recent query
	// 		var dbStatuses = req.user.posts;
	// 		var updatedStatuses = [];

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
	// 					updatedStatuses.unshift(recentStatusQuery[i]);
	// console.log("Status Match", statusMatch);
	// 				}
	// 			} 
	// 			else {
	// 				updatedStatuses.unshift(recentStatusQuery[i]);
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
	// 		
			

				req.user.posts = postIDArray;
				req.user.markModified('posts');
				req.user.save(function(err, user) {
					if (err) {
						console.log('Database save error:', err);
					}
				});
			callback(organizedNewPosts);
		});
	},

};
module.exports = allAPIController;