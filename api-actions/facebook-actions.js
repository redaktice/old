var Facebook = require('facebook-node-sdk');
var keys = require('../private/keys');

var FB = new Facebook({appId: keys.facebookAppID, secret: keys.facebookAppSecret});

// https://developers.facebook.com/docs/graph-api/reference/v2.2/post
// 
var facebookController = {
	getStatus: function(user, callback) {
		console.log("FACEBOOK API:", user);
		FB.setAccessToken(user.profile.facebookToken);
		FB.api(
			"/me/statuses",
			function(err, response) {
				if(err) {
					console.log("Facebook Status Error:", err);
				}
				callback(err, response);
				// }
			});
	},
};


module.exports = facebookController;