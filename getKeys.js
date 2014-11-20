if (process.env.NODE_ENV === "production") {
	console.log('Production');
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
console.log('getKeys Test', keys);
}
console.log('Process Env', process.env);
console.log('NODE Env', process.env.NODE_ENV);
module.exports = keys;