// var Twitter = require('twitter');
var keys = require('../getKeys');
var _ = require('underscore');
var Twitter = require ('node-twitter');
var StatusPost = require('../models/status-posts.js');
var moment = require('moment');

var createTwitterAPIrest = function(user) {
	var twitterAPIRest = new Twitter.RestClient(
		keys.twitter.consumerKey,
		keys.twitter.consumerSecret,
		user.media.twitter.twitterToken,
		user.media.twitter.twitterSecret
	);
	return twitterAPIRest;
};

var twitterController = {
	getTwitterStatus: function(user, callback) {

		var findHashtags = function(tags) {
			var hashtags = tags.map(function(tag) {
				return (tag.text);
			});
			return hashtags;
		};
		// var twitterAPIRest = new Twitter.RestClient(
		// 	keys.twitter.consumerKey,
		// 	keys.twitter.consumerSecret,
		// 	user.media.twitter.twitterToken,
		// 	user.media.twitter.twitterSecret
		// );
		var twitterAPIRest = createTwitterAPIrest(user);
		twitterAPIRest.statusesUserTimeline({}, function(err, result) {
			var primaryPosts;
			if (err) {
				console.log("Twitter Timeline Error:", err);
			}
			else {
				// Change Response to look like an array of information
				var allPosts = result.filter(function(post) {
					return post.in_reply_to_screen_name === null;
				 });

				 // Filter out comment posts
				primaryPosts = allPosts.map(function(post) {

				 	// Create an instance of a StatusPost for
				 	// each incoming Twitter status
				 	var statusPost = new StatusPost(
				 		'@' + post.user.screen_name, //User
				 		user.uniqueURL, //UserID
				 		post.user.profile_image_url, //UserImage
				 		post.id.toString(), //statusID
				 		'twitter', //Source
				 		moment(post.created_at).valueOf(), //creationTime
				 		null, //PostUpdate
				 		post.text, //Post Text
				 		post.image, //Post Image
				 		findHashtags(post.entities.hashtags), //Post Hashtag
				 		null, //Post Comment
				 		{twitter: post.id.toString()} //MediaType
				 	);
				 	return statusPost;
				 });
				}
				
				callback(err, primaryPosts);
			});
	},
	writeStatus: function(req, callback) {
		// var twitterAPIRest = new Twitter.RestClient(
		// 	keys.twitter.consumerKey,
		// 	keys.twitter.consumerSecret,
		// 	req.user.media.twitter.twitterToken,
		// 	req.user.media.twitter.twitterSecret	
		// );
		var twitterAPIRest = createTwitterAPIrest(req.user);
		twitterAPIRest.statusesUpdate({status: req.status}, function(err, returnData) {
			if (err) {
				console.log("Twitter Tweet Error:", err);
			}
			callback(err, returnData);
	});
},

// USED ONLY FOR TESTING
						showTwitterStatus: function(user, callback) {
							// var twitterAPIRest = new Twitter.RestClient(
							// 	keys.twitter.consumerKey,
							// 	keys.twitter.consumerSecret,
							// 	user.media.twitter.twitterToken,
							// 	user.media.twitter.twitterSecret
							// );
							var twitterAPIRest = createTwitterAPIrest(user);
							twitterAPIRest.statusesUserTimeline({}, function(err, result) {
								if (err) {
									console.log("Twitter Timeline Error:", err);
								}
									callback(err, result);
								});
	}


// END USED ONLY FOR TESTING

};

module.exports = twitterController;