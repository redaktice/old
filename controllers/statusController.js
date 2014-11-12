var keys = require('../private/keys');
var User = require('../models/schemas/user');
var keys = require('../private/keys');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');

var StatusPost = require('../models/status-posts.js');


// CONTROLLERS
var facebookController = require('../api-actions/facebook-actions.js');
var twitterController = require('../api-actions/twitter-actions.js');
var authenticationController = require('./authentication.js');
var allAPIController = require('../api-actions/all-actions.js');
var apiController = require('./apiController.js');
// var signedIn = {
// 	facebook: false,
// 	twitter: true,
// };



// Function called when the user does not have a media
//  or is not signed-in to the media
var noAccount = function(callback) {
	callback(null, []);
};

var statusController = {
	createPost: function(req, res) {
	// console.log("REQUEST");
		facebookControl.writeStatus({user: req.user, status: "New #socialvibe #test"}, function(err, response) {
			// console.log('New post response', response);
			res.send(response);
			// res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	},
	createTweet: function(req, res) {
		twitterControl.newTweet({user: req.user, tweet: "@PeterSaidThis New Tweet #socialvibe"}, function(err, response) {
			res.redirect('auth/sendToProfile/' + req.user.uniqueURL);
		});
	},
	updateFacebook: function(req, res) {
		// console.log('Request', req.body);

		User.findOne({uniqueURL: req.body.userID}, function(err, user) {
			if (err) {
				console.log("Facebook had trouble finding the user error", err);
			}

// 			facebookControl.writeStatus({user: user, status: req.body.content}, function(err, response) {
// // console.log('New post response:', response);
// 				if (err) {
// 					console.log(err);
// 				}
// 	//*			
// 				res.send('done');
// 			});
				// res.send('auth/sendToProfile/' + user.uniqueURL);
	
	/*/			facebookControl.updateStatus({user: user, content: req.body.content}, function(err, newStatusPost) {
					if (err) {
						console.log(err);
					}
		console.log('New post:', newStatusPost);
					apiController.pushFacebook({user: user, postID: req.body.postID, facebookID: newStatusPost.postID}, function(err, confirmation){
					});
						res.send(newStatusPost);
					// return (newStatusPost);
	
				});		
			});
		//*/
		});
	},
	revibe: function(req, res) {

		var referenceTime = moment().valueOf() - 1000;


		var controller;
		var originalPostID = req.params.postID;
	// console.log('originalPostID', originalPostID);
		var toMedia = req.params.media;



/*+++++++++++++++++++++++++++++ RE-VIBE TO FACEBOOK +++++++++++++++++++++++++++++*/

		var pushToFacebook = function () {

			var dbStatuses = req.user.posts;
			var originalPost = _.find(dbStatuses, function(dbPost) {
				return dbPost.postID === originalPostID;
			}); // = req.user.posts.id(originalPostID);
			// for (var i = 0; i < req.user.posts.length; i++) {
				// return req.user.posts[i]
			// };

			// console.log("USER", req.user);
			// console.log("originalPost", originalPost);

			controller.writeStatus({user: req.user, status: req.body.content}, function(err, mediaResponse) {

			// console.log("Post response ID:", mediaResponse);
			// originalPost.id(originalPostID) = mediaResponse;
			originalPost.mediaSources.facebook = mediaResponse;

			// for (var i = 0; i < req.user.posts.length; i++) {
			// 	if (req.user.posts[i].postID === originalPostID) {
			// 		req.user.posts[i].media.facebook = mediaResponse;
			// 	}
			// }
			req.user.markModified('posts');
			req.user.save(function(err, user){
				if (err) {
					console.log('Database save error:', err);
				}
				
				allAPIController.updateStatus({user: req.user, referenceTime: referenceTime}, function(updatedStatuses) {
					
					res.send(updatedStatuses);
				});
			});
		});


		}; /*-------------------------- END RE-VIBE TO FACEBOOK --------------------------*/



/*+++++++++++++++++++++++++++++ RE-VIBE TO TWITTER +++++++++++++++++++++++++++++*/

		var pushToTwitter = function () {

		var dbStatuses = req.user.posts;
		var originalPost = _.find(dbStatuses, function(dbPost) {
			return dbPost.postID === originalPostID;
		}); // = req.user.posts.id(originalPostID);
		// for (var i = 0; i < req.user.posts.length; i++) {
			// return req.user.posts[i]
		// };

		// console.log("USER", req.user);
		console.log("originalPost", originalPost);

		controller.writeStatus({user: req.user, status: req.body.content}, function(err, mediaResponse) {

			// if (mediaResponse) {
			console.log("Post response ID:", mediaResponse.id);
			// originalPost.id(originalPostID) = mediaResponse;
			originalPost.mediaSources.twitter = mediaResponse.id;

			// }
			// for (var i = 0; i < req.user.posts.length; i++) {
			// 	if (req.user.posts[i].postID === originalPostID) {
			// 		req.user.posts[i].media.facebook = mediaResponse;
			// 	}
			// }
			
			// console.log("Database Direct", _.find(req.user.posts, function(DB) {
			// 	return DB.postID === originalPostID;
			// }));


			/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
							+++++++++++ SAVE THE DATABSE +++++++++++
			=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
			req.user.posts = req.user.posts.map(function(dbStatus) {
				if (dbStatus.postID === originalPostID) {
					dbStatus.mediaSources.twitter = mediaResponse.id.toString();
				}
				return dbStatus;
			});

			req.user.markModified('posts');
			req.user.save(function(err, user){
				if (err) {
					console.log('Database save error:', err);
				}
				
// console.log('DATABASE', req.user.posts);
				allAPIController.updateStatus({user: req.user, referenceTime: referenceTime}, function(updatedStatuses) {
					
					res.send(updatedStatuses);
		// console.log("originalPost UPDATED", originalPost);
		// console.log("Database Direct UPDATED", _.find(req.user.posts, function(DB) {
		// 		return DB.postID === originalPostID;
		// 	}));
				});
			});
			/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
						----------- END SAVE THE DATABSE -----------
			=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
		});


		}; /*-------------------------- END RE-VIBE TO TWITTER --------------------------*/





		switch (toMedia) {
			case 'facebook':
				controller = facebookController;
				pushToFacebook();
				break;
			case 'twitter':
				controller = twitterController;
				pushToTwitter();
				break;
		}

		


	//*/	
// 	async.auto({
// 			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
// 			twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
// 		}, function(err, results){

// /*
//  res.send(results.twitter);
			
// /*/			
// 			var allPosts = results.facebook.concat(results.twitter);
// 			var organizedPosts = _.sortBy(allPosts, function(post) {
// 				return -1 * moment(post.postTime).valueOf();
// 			});
// 			var postIDArray = organizedPosts.map(function(post){
// 					return {postID: post.postID, media: post.mediaType};
// 			});
// 			req.user.posts = postIDArray;

// 			req.user.markModified('posts');
// 			req.user.save(function(err, user) {
// 				if (err) {
// 					console.log('Database save error:', err);
// 				}
// 			});

// 		var existingStatusQuery = req.user.posts;
// 		var unrenStatuses = [];
// 		for (var i = 0; i < recentStatusQuery.length; i++) {
// 			var statusMatch = _.find(existingStatusQuery, function(statusPost) {
// 				return statusPost === recentStatusQuery[i];
// 			});
// 			if (statusMatch) {

// 				// UPDATE THE POST OBJECT IN THE DATABASE HERE
// 				if(statusMatch.keys.length !== recentStatusQuery[i].keys.length) {

// 					_.extend(statusMatch, recentStatusQuery[i]);
// 					unrenStatuses.unshift(recentStatusQuery[i]);
// 				}
// 			} else {
// 				unrenStatuses.unshift(recentStatusQuery[i]);
// 			}
// 		}
// 		req.user.markModified('posts');
// 		req.user.save(function(err, user) {
// 			if (err) {
// 				console.log('Database save error:', err);
// 			}
// 		});
// 		res.send(unrenStatuses);
// 		});

		

// /*		
// 	res.send(twitterControl.getTwitterStatus.bind(null, req.user));
// /*/		User.findOne({uniqueURL: req.body.userID}, function(err, user) {
// 			if (err) {
// 				console.log("There was a facebook error", err);
// 			}
// 			async.auto({
// 				facebook: facebookControl.getFacebookStatus.bind(null, req.user),
// 				twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
// 			}, function(err, results){
// 	/*
// 	 res.send(results.twitter);

// 	/*/			var allPosts = results.facebook.concat(results.twitter);
// 				var organizedPosts = _.sortBy(allPosts, function(post) {
// 					return -1 * moment(post.postTime).valueOf();
// 				});
// 				// Concatenate the facebook and twitter data
// 				res.send(organizedPosts);
// //*/
// 			});
// 		});
		



	},
	updateStatus: function(req, res) {

		// var existingStatusQuery = req.user.posts;
		// var unrenStatuses = [];
		// for (var i = 0; i < recentStatusQuery.length; i++) {
		// 	var statusMatch = _.find(existingStatusQuery, function(statusPost) {
		// 		return statusPost === recentStatusQuery[i];
		// 	});
		// 	if (statusMatch) {

		// 		// UPDATE THE POST OBJECT IN THE DATABASE HERE
		// 		_.extend(statusMatch, recentStatusQuery[i]);
		// 	} else {
		// 		unrenStatuses.unshift(recentStatusQuery[i]);
		// 	}
		// }
		// req.user.markModified('posts');
		// req.user.save(function(err, user) {
		// 	if (err) {
		// 		console.log('Database save error:', err);
		// 	}
		// });
	},
	vibe: function(req, res) {

		var controller;
		var vibeStatusScaffold;
		var user = req.user;
		var content = req.body.content;
		var referenceTime = moment().valueOf() - 1000;


		var newContent = req.body.cotent;

			async.auto({
			facebook: (req.body.vibeFacebook) ? facebookController.writeStatus.bind(null, {user: user, status: content}) : function(callback) {callback(null, []);},

			twitter: (user.media.twitter && user.media.twitter.isActive && req.body.vibeTwitter) ? twitterController.writeStatus.bind(null, {user: user, status: content}) : function(callback) {callback(null, []);}
			}, function(err, results){


				var FB_responseID = results.facebook;
				var TW_responseID = results.twitter.id.toString();

// console.log('VIBE FACEBOOK RESPONSE:', FB_responseID);
// console.log('VIBE TWITTER RESPONSE:', TW_responseID);
				// if (req.vibeFacebook) {

				// }
				// else if (req.vibeTwitter) {

				// }

				var DB_VibeStatus ={
					source: 'socialvibe',
					creationTime: referenceTime.toString(),
					updateTime: referenceTime.toString(),
					mediaSources: {
						socialvibe: referenceTime.toString()
					}
				};

				if (req.body.vibeFacebook) {
					DB_VibeStatus.postID = FB_responseID;
					DB_VibeStatus.mediaSources.facebook = FB_responseID;

					if (req.body.vibeTwitter) {
						DB_VibeStatus.mediaSources.twitter = TW_responseID;
					}
				}
				else if (req.body.vibeTwitter) {
					DB_VibeStatus.postID = TW_responseID;
					DB_VibeStatus.mediaSources.twitter = TW_responseID;
				}

// 				var newStatus = new StatusPost(
// 			 		(user.profile.firstName + ' ' + user.profile.lastName),
// 			 		user.uniqueURL,
// 			 		user.profile.image,
// 			 		referenceTime,
// 			 		'socialvibe',
// 			 		moment().valueOf(),
// 			 		moment().valueOf(),
// 			 		'content',
// 			 		req.body.image,
// 			 		req.body.hashtags,
// 			 		'This is a vibe!',
// 			 		{
// 			 			socialvibe: moment().valueOf(),
// 			 			facebook: FB_responseID,
// 			 			twitter: TW_responseID
// 			 		}
// 				 );

// console.log('NEW VIBE STATUS:', newStatus);
// 					var DB_newStatus =  {
// 							postID: newStatus.postID,
// 							source: newStatus.source,
// 							creationTime: newStatus.postTime,
// 							updateTime: newStatus.updateTime,
// 							mediaSources: newStatus.mediaType
// 						};


				console.log('NEW DB ITEM:', DB_VibeStatus);
				/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
							+++++++++++ SAVE THE DATABSE +++++++++++
				=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
				
				// console.log('DATABASE LENGTH:', req.user.posts.length);
				req.user.posts.unshift(DB_VibeStatus);
				req.user.markModified('posts');
				req.user.save(function(err, user){
					if (err) {
						console.log('Database save error:', err);
					}
					
					allAPIController.updateStatus({user: req.user, referenceTime: referenceTime}, function(updatedStatuses) {
						

						console.log('VIBE UPDATED ARRAY:', updatedStatuses);
						res.send(updatedStatuses);
				// console.log('DATABASE LENGTH SAVED:', req.user.posts.length);
			
					});
				});
				/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
						----------- END SAVE THE DATABSE -----------
				=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
			});
	},


	// FOR TESTING ONLY
			displayStatus: function(req, res) {
				facebookControl.showFacebookStatus(req.user, function(err, response) {
					res.send(response);
				});
			},
			displayTwitterTime: function (req, res) {
				twitterControl.showTwitterStatus(req.user, function(err, result) {
					res.send(result);
				});
			}
	
};

module.exports = statusController;