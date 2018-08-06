var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var formController = require('./controllers/formController.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

// Redirect when the form is submitted
app.post('/formsubmit', formController.submit);


var server = app.listen(9163, function() {
	console.log('Express server listening on port ' + server.address().port);
});
