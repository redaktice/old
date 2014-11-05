var keys = require('../private/keys');
var passport = require('passport');
var User = require('../models/schemas/user');


var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

var facebookStrategy = new FacebookStrategy({
	clientID: keys.facebookAppID,
	clientSecret: keys.facebookAppSecret,
	callbackURL: 'http://localhost:9609/auth/facebookcallback'
}, function(accessToken, refreshToken, profile, done){
	
	User.findOne({fbID: profile.id}, function(err, user) {
		if (err) {
			return done(err);
		}
		if(!user) {
			delete profile._raw;
			delete profile._json;
			profile.token = accessToken;
			var newUser = new User({
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
			// if (error) {
			// 	req.flash('New User Error', error);
			// 	return res.
			// }
			//return done(null, false);
		}
		else {
			return done(null, user);
		}
	});
console.log(profile);
//	return done(null, profile);
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