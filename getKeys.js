if (process.env.NODE_ENV === "production") {
	var keys = {
		facebook: {
			appID: process.env.FACEBOOK_ID,
			appSecret: process.env.FACEBOOK_SECRET
		},
		twitter: {
			consumerKey: process.env.TWITTER_ID,
			consumerSecret: process.env.TWITTER_SECRET
		}
	};
}
else {
	var keys = require('./private/keys.js');
}
console.log('getKeys Test', keys);
module.exports = keys;