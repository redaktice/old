var User = require('../models/schemas/user');
var async = require('async');

var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');


var apiController = {
	pushFacebook: function(req, res) {
		var postID;
console.log('Facebook push called');

		var user = req.user;
		for (var i = 0; i < user.posts.length; i++) {
			if (user.posts[i].originalID === req.postID) {
				postID = user.posts[i];
				user.posts[i].facebookID = req.facebookID;
				break;
			}
		}
console.log('Post:', postID);
		// Check to see if this post has already been saved
		if(!postID) {
			user.posts.push({originalID: req.postID, facebookID: req.facebookID});
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