var User = require('../models/schemas/user');
var async = require('async');

var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');


var apiController = {
	pushFacebook: function(req, res) {
		var statusID;
console.log('Facebook push called');

		var user = req.user;
		for (var i = 0; i < user.posts.length; i++) {
			if (user.posts[i].originalID === req.statusID) {
				statusID = user.posts[i];
				user.posts[i].facebookID = req.facebookID;
				break;
			}
		}
console.log('Post:', statusID);
		// Check to see if this post has already been saved
		if(!statusID) {
			user.posts.push({originalID: req.statusID, facebookID: req.facebookID});
		}

		// Save the User in the database
		user.markModified('posts');
		user.save(function(err, user){
			if (err) {
				console.log('save error', err);
			}
			console.log('saved');
		});
	},
};

module.exports = apiController;