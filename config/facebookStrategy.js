var keys = require('../private/keys');
var passport = require('passport');
var User = require('../models/schemas/user');
var FacebookStrategy = require('passport-facebook').Strategy;



// Create an insance of the Passport Facebook Strategy
var facebookStrategy = new FacebookStrategy({
	clientID: keys.facebook.appID,
	clientSecret: keys.facebook.appSecret,
	callbackURL: 'http://localhost:9609/auth/facebookcallback',
	}, function(accessToken, refreshToken, profile, done){
	

		// Look for a user in the database with the same Facebook ID.
		User.findOne({fbID: profile.id}, function(err, user) {
			if (err) {
				return done(err);
			}
			// If the user is not in the database, create a new user object in the database
			if(!user) {
				delete profile._raw;
				delete profile._json;
				// profile.facebookToken = accessToken;
				var newUser = new User({
					profile: {
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						image: 'http://graph.facebook.com/' + profile.id + '/picture?type=large'
					},
					vibeID: (10* Math.random()).toFixed(2),
					// image: 'http://graph.facebook.com/' + profile.id + '/picture?type=large',
					fbID: profile.id,
					// profile: profile,
					media: {
						facebook: {
							facebookToken: accessToken,
							profile: profile
						}
					}
				});
				newUser.save(function(err, user){
					console.log({"Errors": err, "User": user});
					return done(err, user);
				});
			}
			// If a user was found, update the accessToken
			else {
				user.media.facebook.facebookToken = accessToken;
				user.markModified('facebook');
				user.save(function(err, user){
					console.log({"Errors": err, "User": user});
					return done(null, user);
				});
			}
		});
	}
);

module.exports = facebookStrategy;