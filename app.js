var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

// Controllers
var indexController = require('./controllers/index.js');
var authenticationController = require('./controllers/authentication.js');
var facebookController = require('./api-actions/facebook-actions.js');
var statusController = require('./controllers/statusController.js');
var apiController = require('./controllers/apiController.js');
var allAPIController = require('./api-actions/all-actions.js');

// Establish and connect to database
mongoose.connect('mongodb://localhost/social-vibe');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());
app.use(session({secret: '5=-098ejhl;p864irrejfuy8][-0o'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
	res.redirect('/auth/login');
});


// LOGIN AUTHENTICATION
app.get('/auth/login', authenticationController.login);



/*+++++++++++++++++++++++++++++ FACEBOOK API +++++++++++++++++++++++++++++*/
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
/*-------------------------- END FACEBOOK API -----------------------------*/




// UNAUTHORIZED PROTECTION
app.use(passportConfig.ensureAuthentication);





/*+++++++++++++++++++++++++++++ TWITTER API +++++++++++++++++++++++++++++*/
app.get('/auth/twitter',
		passport.authenticate('twitter'), function(req, res) {
// This is not run because of the passport.authenticate('facebook') redirect to facebook
});
			// 	// LOOK HERE https://github.com/BoyCook/TwitterJSClient/blob/master/lib/Twitter.js
			// 	https://dev.twitter.com/overview/api/twitter-ids-json-and-snowflake

// Called by Facebook after confirming login
app.get('/auth/twittercallback',
		passport.authenticate('twitter', {failureRedirect: '/auth/sendToProfile/:uniqueUser'}), 
		authenticationController.attemptLogin
);

/*-------------------------- END TWITTER API -----------------------------*/




// Go to user home page
app.get('/auth/sendToProfile/:uniqueUser', authenticationController.sendToProfile);
app.get('/auth/showStatuses', authenticationController.showStatuses);
app.get('/status/newstatus', statusController.createPost);
app.get('/status/newtweet', statusController.createTweet);


// RE-VIBE ACTIONS
app.post('/status/pushFacebook', statusController.updateFacebook);
// app.post('/status/updateStatus', statusController.updateStatus);


app.post('/status/revibe/:postID/:media', statusController.revibe);
app.post('/status/vibe', statusController.vibe);

app.get('/status/updateStatus', allAPIController.updateStatus);

// USED ONLY FOR TESTING
app.get('/posts', statusController.displayStatus);
app.get('/twittertime', statusController.displayTwitterTime);


app.get('/auth/logout', authenticationController.logout);


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