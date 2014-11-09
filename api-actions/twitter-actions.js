// var Twitter = require('twitter');
var keys = require('../private/keys');
var _ = require('underscore');

// var twitterAPI = new Twitter({
// 	consumer_key: keys.twitter.consumerKey,
// 	consumer_secret: keys.twitter.consumerSecret
// });

var Twitter = require ('node-twitter');
var StatusPost = require('../models/status-posts.js');


var twitterController = {
	getTwitterStatus: function(user, callback) {
// console.log("FACEBOOK API:", user);
		var twitterAPIRest = new Twitter.RestClient(
			keys.twitter.consumerKey,
			keys.twitter.consumerSecret,
			user.media.twitter.twitterToken,
			user.media.twitter.twitterSecret
		);
		twitterAPIRest.statusesUserTimeline({}, function(err, result) {
			if (err) {
				console.log("Twitter Timeline Error:", err);
			}

				// Change Response to look like an array of information
				 var allPosts = result.filter(function(post) {
				 	// if (typeof(post.in_reply_to_screen_name) === null) {//} || post.in_reply_to_screen_name === null) {
				 	// 	return post;
				 	// }
					return post.in_reply_to_screen_name === null;
				 });
				 // console.log('====================ALL POSTS FROM TWITTER YO================', allPosts);
				 var primaryPosts = allPosts.map(function(post) {

				 	var statusPost = new StatusPost(
				 		'@' + post.user.screen_name,
				 		post.profile_image_url,
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
				// }
			});
	},
	newTweet: function(user, callback) {
		var newTweet = "Test tweet from my web app";
		var twitterAPIRest = new Twitter.RestClient(
			keys.twitter.consumerKey,
			keys.twitter.consumerSecret,
			user.media.twitter.twitterToken,
			user.media.twitter.twitterSecret	
		);
		twitterAPIRest.statusesUpdate({status: newTweet}, function(err, returnData) {
			if (err) {
				console.log("Twitter Tweet Error:", err);
			}
			callback(err, returnData);
	});
}
	// getHomeTimeline: function(user, callback) {
	// 	var twitterAPIRest = new Twitter.RestClient(
	// 		keys.twitter.consumerKey,
	// 		keys.twitter.consumerSecret,
	// 		user.media.twitter.twitterToken,
	// 		user.media.twitter.twitterSecret
	// 	);
	// 	twitterAPIRest.statusesUserTimeline({}, function(err, result) {
	// 		if (err) {
	// 			console.log("Twitter Timeline Error:", err);
	// 		}
	// 		if (result) {
	// 			callback(err, result);
	// 		}
	// 	});
	// }
};

module.exports = twitterController;