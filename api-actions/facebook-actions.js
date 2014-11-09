var Facebook = require('facebook-node-sdk');
var keys = require('../private/keys');
var StatusPost = require('../models/status-posts.js');

var FB = new Facebook({appId: keys.facebook.appID, secret: keys.facebook.appSecret});

// https://developers.facebook.com/docs/graph-api/reference/v2.2/post
// 
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
				 		'http://graph.facebook.com/' + post.from.id + '/picture?type=large',
				 		post.id,
				 		post.updated_time,
				 		post.message,
				 		post.image,
				 		'hashtags go here',
				 		post.comments,
				 		{facebook: true}
				 		);
				 	return statusPost;
				 });
				
				callback(err, allPosts);
				// }
			});
	},
	writeStatus: function(user, callback) {
		FB.setAccessToken(user.media.facebook.facebookToken);
		var data = "This is another test post from my awesome web app";
		FB.api(
			"/me/feed",
			'post',
			{message: data}, function(response) {
				if (!response || response.error) {
					console.log("POST:", response);			
					console.log("There was a post error", response);
				}
				console.log("POST:", response);
				callback(response);
			});
	}
	// writeStatus: function(user, callback) {
	// 	FB.setAccessToken(user.media.facebook.facebookToken);
	// 	FB.ui({
	// 		method: 'feed',
	// 		link: 'https://developers.facebook.com/docs/',
	// 		caption: 'Test'},
	// 		function(err, res) {
	// 			if (err) {
	// 				console.log("POST:", res);			
	// 				console.log("There was a post error", err);
	// 			}
	// 			console.log("POST:", res);
	// 			callback(err, res);
	// 		});
	// }
	// https://developers.facebook.com/docs/graph-api/reference/v2.2/user/feed#publish






// 	getStatus: function(user, callback) {
// // console.log("FACEBOOK API:", user);
// 		FB.setAccessToken(user.media.facebook.facebookToken);
// 		FB.api(
// 			"/me/statuses",
// 			function(err, response) {
// 				if(err) {
// 					console.log("Facebook Status Error:", err);
// 				}
// 				callback(err, response);
// 				// }
// 			});
// 	},
};


module.exports = facebookController;