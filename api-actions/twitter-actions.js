// var Twitter = require('twitter');
var keys = require('../private/keys');
var _ = require('underscore');
var Twitter = require ('node-twitter');
var StatusPost = require('../models/status-posts.js');

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

				// Change Response to look like an array of information
				 var allPosts = result.filter(function(post) {
					return post.in_reply_to_screen_name === null;
				 });

				 // Filter out comment posts
				 var primaryPosts = allPosts.map(function(post) {

				 	// Create an instance of a StatusPost for
				 	// each incoming Twitter status
				 	var statusPost = new StatusPost(
				 		'@' + post.user.screen_name,
				 		post.user.profile_image_url,
				 		post.id,
				 		post.created_at,
				 		post.text,
				 		post.image,
				 		post.entities.hashtags,
				 		'No twitter comments set up yet',
				 		{twitter: true}
				 	);
				 	return statusPost;
				 });
				
				callback(err, primaryPosts);
			});
	},
	newTweet: function(req, callback) {
		// var twitterAPIRest = new Twitter.RestClient(
		// 	keys.twitter.consumerKey,
		// 	keys.twitter.consumerSecret,
		// 	req.user.media.twitter.twitterToken,
		// 	req.user.media.twitter.twitterSecret	
		// );
		var twitterAPIRest = createTwitterAPIrest(req.user);
		twitterAPIRest.statusesUpdate({status: req.tweet}, function(err, returnData) {
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