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
	}
	writeStatus: function(user, callback) {
		FB.setAccessToken(user.media.facebook.facebookToken)
	}
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