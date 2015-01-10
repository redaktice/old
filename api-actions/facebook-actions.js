var Facebook = require('facebook-node-sdk');
var keys = require('../getKeys');
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
				 		post.from.name, //User
				 		user.uniqueURL, //UserID
				 		'http://graph.facebook.com/' + post.from.id + '/picture?type=large', //UserImage 
				 		post.id, //Post ID
				 		'facebook', //Post Source
				 		post.updated_time, //Post Time
				 		null, //Post Update
				 		post.message, //Post Text
				 		post.image, //Post Image
				 		null, //Post Hashtag
				 		post.comments, //Post Comment
				 		{facebook: true} //Post MediaType
				 		);
				 	return statusPost;
				 });
				
				callback(err, allPosts);
				// }
			});
	},
	writeStatus: function(user, callback) {
		FB.setAccessToken(user.media.facebook.facebookToken);
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