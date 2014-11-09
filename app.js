var express = require('express');
var session = require('express-session');
var cookeParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

// Controllers
var indexController = require('./controllers/index.js');
var authenticationController = require('./controllers/authentication.js');
var facebookController = require('./api-actions/facebook-actions.js');

// Establish and connect to database
mongoose.connect('mongodb://localhost/social-vibe');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookeParser());
app.use(flash());
app.use(session({secret: '5=-098ejhl;p864irrejfuy8][-0o'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
	res.redirect('/auth/login');
});
// LOGIN AUTHENTICATION

app.get('/auth/login', authenticationController.login);

app.get('/auth/facebook',
		passport.authenticate('facebook',
			{scope: [
				'read_stream',
				'read_friendlists',
				// 'user_activities',
				'user_status',
				'publish_actions',
				// 'user_photos',
				'manage_notifications'
				]

				// LOOK HERE https://developers.facebook.com/docs/facebook-login/permissions/v2.2
			}
		),
		function(req, res) {
// This is not run because of the passport.authenticate('facebook') redirect to facebook
}
);

// Called by Facebook after confirming login
app.get('/auth/facebookcallback',
		passport.authenticate('facebook', {failureRedirect: '/auth/login'}), 
		authenticationController.attemptLogin
);



// UNAUTHORIZED PROTECTION
app.use(passportConfig.ensureAuthentication);


app.get('/auth/twitter',
		passport.authenticate('twitter'
			// 	// LOOK HERE https://github.com/BoyCook/TwitterJSClient/blob/master/lib/Twitter.js
			// 	https://dev.twitter.com/overview/api/twitter-ids-json-and-snowflake
		),
		function(req, res) {
// This is not run because of the passport.authenticate('facebook') redirect to facebook
}
);

// Called by Facebook after confirming login
app.get('/auth/twittercallback',
		passport.authenticate('twitter', {failureRedirect: '/auth/sendToProfile/:uniqueUser'}), 
		authenticationController.attemptLogin
);


app.get('/auth/sendToProfile/:uniqueUser', authenticationController.sendToProfile);
app.get('/posts', authenticationController.displayStatus);
app.get('/twittertime', authenticationController.displayTwitterTime);
app.get('/newstatus', authenticationController.createPost);
app.get('/newtweet', authenticationController.createTweet);



app.get('/auth/logout', authenticationController.logout);


// app.get('/sendToProfile', authenticationController.sendToProfile);

// app.post('/auth/login', indexController.getLogin);
// app.get('/profile/:user', indexController.getProfile);

var server = app.listen(9609, function() {
	console.log('Express server listening on port ' + server.address().port);
});

// function appGet(path, handler) {
// 	app.use(function (req, res, next) {
// 		if (req.url == path && req.method == 'get')
// 			return handler(req, res, next)
// 		else
// 			return next()
// 	})
// }