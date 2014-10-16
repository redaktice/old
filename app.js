var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var entryController = require('./controllers/entryController.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
app.get('/entry', indexController.entry);

app.get('/currentEntries', entryController.allEntries);

app.post('/addSubmission', entryController.newSubmission);

app.post('/vote/:entryNumber', entryController.addVote);


var server = app.listen(3110, function() {
	console.log('Express server listening on port ' + server.address().port);
});


//  10100010101010010110000000000000000000000000000000030303030050050360045004500506569048604698274095872094857029847598234759823740968724309867234095720938467029384747589740742876458237923958492658293456529559464720896547894567868746287906428790468794879420897602948672049867204968724096872409672487894897794536366376376397639756976935764676496497697969437699576576305676857498759879485798547698547594845