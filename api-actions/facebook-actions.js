var Facebook = require('facebook-node-sdk');
var keys = require('../private/keys');
var StatusPost = require('../models/status-posts.js');

var FB = new Facebook({appId: keys.facebook.appID, secret: keys.facebook.appSecret});

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
	writeStatus: function(statusPost, callback) {
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
};


module.exports = facebookController;