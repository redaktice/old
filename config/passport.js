var keys = require('../private/keys');
var passport = require('passport');
var User = require('../models/schemas/user');
// Get the Facebook Passport Strategy
var FacebookStrategy = require('passport-facebook').Strategy;


// Passport serialization
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});


// Create an insance of the Passport Facebook strategy
var facebookStrategy = new FacebookStrategy({
	clientID: keys.facebookAppID,
	clientSecret: keys.facebookAppSecret,
	callbackURL: 'http://localhost:9609/auth/facebookcallback'
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
			profile.facebookToken = accessToken;
			var newUser = new User({
				vibeID: (10* Math.random()).toFixed(2),
				image: 'http://graph.facebook.com/' + profile.id + '/picture?type=large',
				fbID: profile.id,
				profile: profile,
				media: {
					facebook: 'facebook'
				}
			});
			newUser.save(function(err, user){
				console.log({"Errors": err, "User": user});
				return done(err, user);
			});
		}
		// If a user was found, update the accessToken
		else {
			user.profile.facebookToken = accessToken;
			user.markModified('profile');
			user.save(function(err, user){
				console.log({"Errors": err, "User": user});
				return done(null, user);
			});
		}
	});
});

passport.use(facebookStrategy);

module.exports = {
	userProfile: '',
	ensureAuthentication: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/login');
	}
};