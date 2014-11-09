var User = require('../models/schemas/user');
var async = require('async');

var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');


var apiController = {
	pushFacebook: function(req, res) {
		var postID;
console.log('Facebook push called');
		// console.log(req);
		User.findOne({uniqueURL: req.body.userID}, function(err, user) {
			if (err) {
				console.log("There was a facebook post error", err);
			}

			for (var i = 0; i < user.posts.length; i++) {
				if (user.posts[i].originalID === req.body.postID) {
					postID = user.posts[i];
					break;
				}
			}
console.log('Post:', postID);
			// Check to see if this post has already been saved
			if(!postID) {
				user.posts.push({originalID: req.body.postID});
			}
			user.save(function(err, user){
				if (err) {
					console.log('save error', err);
				}
				console.log('saved');
			});
			res.send(user);
		});
	}

};

module.exports = apiController;