var Facebook = require('facebook-node-sdk');
var User = require('../models/schemas/user');

var keys = require('../private/keys');
var StatusPost = require('../models/status-posts.js');
var _ = require('underscore');


var FB = new Facebook({appId: keys.facebook.appID, secret: keys.facebook.appSecret});
var findHashtags = function(post) {
	var postWords = post.split(' ');
// console.log('Post Words', postWords);
	var hashtags = postWords.filter(function(word) {
// console.log('Hashtag found', word[0] === '#');
		return word[0] === '#';
	});
	return hashtags;
};

// https://developers.facebook.com/docs/graph-api/reference/v2.2/post
// https://developers.facebook.com/docs/javascript/reference/FB.api
// https://developers.facebook.com/docs/facebook-login/permissions/v2.2
var facebookController = {
	getFacebookStatus: function(user, callback) {
// console.log("FACEBOOK API:", user);
		FB.setAccessToken(user.media.facebook.facebookToken);
		FB.api(
			"/me/statuses",
			function(err, response) {
				if(err) {
					console.log("Facebook Status Error:", err);
				}

				// Change Response to look like an array of information
				 var allPosts = response.data.map(function(post) {
				 	var statusPost = new StatusPost(
				 		post.from.name,
				 		user.uniqueURL,
				 		'http://graph.facebook.com/' + post.from.id + '/picture?type=large',
				 		post.id,
				 		post.updated_time,
				 		post.message,
				 		post.image,
				 		findHashtags(post.message),
				 		post.comments,
				 		{facebook: true}
				 		);
				 // console.log('Facebook hashtags', statusPost.hashtag);
				 	return statusPost;
				 });
				
				callback(err, allPosts);
			});
	},
	writeStatus: function(req, callback) {
		FB.setAccessToken(req.user.media.facebook.facebookToken);
		FB.api(
			"/me/feed",
			'post',
			{message: req.status}, function(response) {
				if (!response || response.error) {
					// console.log("POST:", response);			
					console.log("There was a post error", response);
				}
				// console.log("POST:", response);
				console.log("POST", response);
				callback(response);
			});
	},
	updateStatus: function(req, callback) {

		// User.findOne({uniqueURL: req.userID}, function(err, user) {
		// 	if (err) {
		// 		console.log("There was a facebook error", err);
		// 	}
			FB.setAccessToken(req.user.media.facebook.facebookToken);
			FB.api(
				"/me/statuses",
				function(err, response) {
					if(err) {
						console.log("Facebook Status Error:", err);
					}

					// Change Response to look like an array of information
					 var recentPost = response.data[0];

					 for (var i = 1; i < response.data.length; i++) {
					 	if (response.data[i].id == recentPost.id) {
					 		callback(err, null);
					 		return;
					 	}
					 }

	console.log('recent post', recentPost);
					 var newStatusPost = new StatusPost(
					 		recentPost.from.name,
					 		req.user.uniqueURL,
					 		'http://graph.facebook.com/' + recentPost.from.id + '/picture?type=large',
					 		recentPost.id,
					 		recentPost.updated_time,
					 		recentPost.message,
					 		recentPost.image,
					 		findHashtags(recentPost.message),
					 		recentPost.comments,
					 		{facebook: true}
					 	);
	console.log('new status post', newStatusPost);



					callback(err, newStatusPost);
				});
		// });
	},



// USED ONLY FOR TESTING
					showFacebookStatus: function(user, callback) {
						FB.setAccessToken(user.media.facebook.facebookToken);
						FB.api(
							"/me/statuses",
							function(err, response) {
								if(err) {
									console.log("Facebook Status Error:", err);
								}
								callback(err, response);
							});
	},

// END USED ONLY FOR TESTING



};


module.exports = facebookController;