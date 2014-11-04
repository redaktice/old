var keys = require('../private/keys');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	login: function(req, res) {
		res.render('login', {key: keys.facebookAppID});
	},
	// getLogin: function(req, res) {

	// // Access database and get info
	// console.log(req.body);
	// res.render('profile', {key: keys.facebookAppID}); // + mongooseID);

	// },
	getProfile: function(req, res) {
// console.log("Test");
		// Access database and get info
		res.render('profile', {user: user, key: keys.facebookAppID});
	}
};

module.exports = indexController;