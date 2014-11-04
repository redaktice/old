var express = require('express');
var session = require('express-session');
var cookeParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');

var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

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

app.get('/auth/facebook', passport.authenticate('facebook', {scope: [
	'read_stream'
	]}), function(req, res) { 
// This is not run because of the passport.authenticate('facebook') redirct
});
app.get('/auth/facebookcallback', passport.authenticate('facebook', {failureRedirect: '/'}), indexController.getProfile);
app.get('/', indexController.login);

app.post('/login', indexController.getLogin);
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