var keys = require('../private/keys');
var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	done(null, id);
});

var facebookStrategy = new FacebookStrategy({
	clientID: keys.facebookAppID,
	clientSecret: keys.facebookAppSecret,
	callbackURL: 'http://localhost:9609/auth/facebookcallback'
}, function(accessToken, refreshToken, profile, done){
	// User is NOW logged in here
	// Get user info and update DB
console.log(profile);
	return done(null, profile);
});

passport.use(facebookStrategy);