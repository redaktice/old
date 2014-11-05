var keys = require('../private/keys');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	getLogin: function(req, res) {

	// Access database and get info
	// console.log(req.body);
	res.render('profile', {key: keys.facebookAppID}); // + mongooseID);
	}
};

module.exports = indexController;