var keys = require('../private/keys');
var passport = require('passport');
var User = require('../models/schemas/user');
var TwitterStrategy = require('passport-twitter').Strategy;

// Create an insance of the Passport Twitter Strategy
var twitterStrategy = new TwitterStrategy({
	consumerKey: keys.twitter.consumerKey,
	consumerSecret: keys.twitter.consumerSecret,
	callbackURL: 'http://localhost:9609/auth/twittercallback',
	passReqToCallback: true
	}, function(req, accessToken, secretToken, profile, done){
		if (!req.user) {
			return done(null, false);
		}
		req.user.media.twitter = {
			isActive: true,
			twitterToken: accessToken,
			twitterSecret: secretToken
		};

		req.user.markModified('media');
		req.user.save(function(err, user) {
			return done(null, req.user);		
		});

	}
);

module.exports = twitterStrategy;