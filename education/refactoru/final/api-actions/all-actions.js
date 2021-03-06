var _ = require('underscore');
var moment = require('moment');
var async = require('async');

var StatusPost = require('../models/status-posts.js');


var facebookControl = require('../api-actions/facebook-actions.js');
var twitterControl = require('../api-actions/twitter-actions.js');


var allAPIController = {

	/**
	 * Updates the profile feed
	 * @param  {AJAX}   req      the user signed into the application
	 * @param  {Function} callback executed after finding new/altered posts
	 * @return {Array}            List of new/altered posts for rendering
	 */
	NupdateStatus: function (req, callback) {

		// console.log('Update User', req.user);
		// async.auto({
		// 	facebook: facebookControl.getFacebookStatus.bind(null, req.user),
		// 	twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
		// }, function(err, results){

		// 		// Combine all the posts from media and organize by date
		// 		// var allPosts = results.facebook.concat(results.twitter);
		// 		// var organizedPosts = _.sortBy(allPosts, function(post) {
		// 		// 	return -1 * moment(post.creationTime).valueOf();
		// 		// });
		// 	var allStatuses = results.facebook.concat(results.facebook);
		// 		var organizedPosts = _.sortBy(allStatuses, function(post) {
		// 			return -1 * moment(post.creationTime).valueOf();
		// 		});

		// 		console.log('Organized Posts', organizedPosts);

		// 		var statusIDArray = organizedPosts.map(function(post){
		// 			return {statusID: post.statusID, media: post.mediaType};
		// 		});




		// 		var dbStatuses = req.user.statuses;


		// 		var updatedStatuses = dbStatuses.map(function(dbPost) {

		// 			console.log('Map arguments', arguments);
		// 			var resultingPost;

		// 			// Look for THIS statusID from the databse
		// 			// ALSO in the Facebook response
		// 			var fbMatch = _.find(results.facebook, function(fbPost) {
		// 				return fbPost.statusID === dbPost.media.facebook;
		// 			});
		// 			if (fbMatch) {
		// 				resultingPost = fbMatch;
		// 				resultingPost.mediaType.facebook = fbMatch.statusID;
		// 			}

		// 			// Look for THIS statusID from the databse
		// 			// ALSO in the Twitter response
		// 			var twMatch = _.find(results.twitter, function(twPost) {
		// 				return twPost.statusID === dbPost.media.twitter;
		// 			});

		// 			// If THIS database statusID exists in the Twitter response:
		// 			if (twMatch) {

		// 				// If THIS database statusID is ALSO
		// 				//  in the Facebook response:
		// 				if (!resultingPost) {

		// 					// Use the Twitter response if there is
		// 					// NO matching Facbook response
		// 					resultingPost = twMatch;
		// 				}
		// 				// Update the media property in the Facebook response
		// 				// and use the Facebook response
		// 				resultingPost.mediaType.twitter = twMatch.statusID;

		// 				// statusIDArray[dbStatuses.indexOf(dbPost)].media.twitter = twMatch.statusID;

		// 			}

		// console.log('Update result', resultingPost);
		// 			return resultingPost;
		// 		});

		// 	// Send back the organized new/changed posts
		// 	// Remove null entries in the array from the map
		// 	var allUpdatedStatuses = _.compact(updatedStatuses);
		// 	var organizedNewPosts = _.sortBy(allUpdatedStatuses, function(post) {
		// 		return 1 * moment(post.creationTime).valueOf();
		// 	});

			// Create a simplified of array of IDs and media sources
	// 		var statusIDArray = organizedPosts.map(function(post){
	// 				return {statusID: post.statusID, media: post.mediaType};
	// 		});

	// 		var recentStatusQuery = organizedPosts;
	// 		// Compare the list of post IDs in the database
	// 		//  to the most recent query
	// 		var dbStatuses = req.user.statuses;
	// 		var updatedStatuses = [];

	// 		for (var i = 0; i < recentStatusQuery.length; i++) {
	// 		// }
			
	// 		// for (var i = 0; i < recentStatusQuery.length; i++) {

	// 			// Locate any posts already in the database
	// 			var statusMatch = _.find(dbStatuses, function(statusPost) {
	// 		console.log("statusPost - id check", statusPost);
	// 		console.log("recent post - id check", recentStatusQuery[i]);
	// 				return statusPost.statusID === recentStatusQuery[i].statusID;
	// 			});

	// // console.log("Status Match", statusMatch);
	// 			// Update any matched statuses
	// 			if (statusMatch) {
	// 				if(statusMatch.mediaType.facebook !== recentStatusQuery[i].mediaType.facebook) {

	// 					_.extend(statusMatch, recentStatusQuery[i]);
	// 					updatedStatuses.unshift(recentStatusQuery[i]);
	// console.log("Status Match", statusMatch);
	// 				}
	// 			} 
	// 			else {
	// 				updatedStatuses.unshift(recentStatusQuery[i]);
	// 				req.user.statuses.unshift(recentStatusQuery[i]);
	// 			}
	// 		}
	// 		// Save any changes made to the list of
	// 		//  posts in the database
	// 		req.user.markModified('posts');
	// 		req.user.save(function(err, user) {
	// 			if (err) {
	// 				console.log('Database save error:', err);
	// 			}
	// 		});
	// 		
			

		// 		req.user.statuses = statusIDArray;
		// 		req.user.markModified('posts');
		// 		req.user.save(function(err, user) {
		// 			if (err) {
		// 				console.log('Database save error:', err);
		// 			}
		// 		});
		// 	callback(organizedNewPosts);
		// });
	},
	updateStatus: function (req, callback) {

		
		var referenceTime = req.referenceTime;

		var DB_statuses = req.user.statuses;

		async.auto({
			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
				twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
			}, function(err, results){

				var FB_statusArray = results.facebook;
				var TW_statusArray = results.twitter;

				var renderStatusArray = DB_statuses.map(function(dbStatus){

					var renderStatusInstance;

					/*+++++++++++++++++++++ SEARCH DB IN FACEBOOK +++++++++++++++++++++*/

					var onlyFBStatusInstance;
					// Look for the DB status in FACEBOOK
					// Return the FB status object
					var fbInDB = _.find(FB_statusArray, function(fbStatus) {
						return (fbStatus.statusID === dbStatus.mediaSources.facebook);
					});
					// If status exists in FB, remove the status from FB array
					if (fbInDB) {

						// Assign reference to FB status instance to be rendered
						renderStatusInstance = fbInDB;
// console.log('Facebook matched');
						// console.log('fbInDB', fbInDB);

						renderStatusInstance.mediaType.facebook = fbInDB.statusID;
						renderStatusInstance.facebook = fbInDB.statusID;

						// Remove the fbInDB status from FB array
						FB_statusArray = _.reject(FB_statusArray, function(foundStatus){
							return (foundStatus.statusID === fbInDB.statusID);
						});
					}/*--------------------- END FACEBOOK SEARCH ---------------------*/



					/*+++++++++++++++++++++ SEARCH DB IN TWITTER +++++++++++++++++++++*/
					
					var onlyTWStatusInstance;
					// Look for the DB status in TWITTER
					// Return the TW status object
					var twInDB = _.find(TW_statusArray, function(twStatus) {
						return (twStatus.statusID === dbStatus.mediaSources.twitter);
					});

					// If status exists in TW, remove status from TW array
					if (twInDB) {
// console.log('Twitter matched');

						// console.log('twInDB', twInDB);
						// Assign reference to TW status instance to be rendered
						renderStatusInstance = twInDB;
						renderStatusInstance.mediaType.twitter = twInDB.statusID;
						renderStatusInstance.twitter = twInDB.statusID;

						// Remove the twInDB satus from the TW array
						TW_statusArray = _.reject(TW_statusArray, function(foundStatus){
							return (foundStatus.statusID === twInDB.statusID);
						});
					}/*--------------------- END TWITTER SEARCH ---------------------*/






			/*================== GENERATE INSTANCE OF DB-MATCHED STATUSES ==================*/

					/*++++++++++++++++++++++ FILTER DUPLICATES ++++++++++++++++++++++*/
					



/*~~~~~~~~~~~~~~~~~~~~ VIBE WAS THE SOURCE ~~~~~~~~~~~~~~~~~~~~*/
					// if (dbStatus.source === 'socialvibe') {

					// 	// renderStatusInstance = new StatusPost(
			 	// 	// 		(req.user.profile.firstName + ' ' + req.user.profile.lastName),
			 	// 	// 		req.user.uniqueURL,
			 	// 	// 		req.user.profile.image,
			 	// 	// 		dbStatus.creationTime,
			 	// 	// 		'socialvibe',
			 	// 	// 		dbStatus.creationTime,
			 	// 	// 		dbStatus.updateTime,
			 	// 	// 		'text: placeholder',
			 	// 	// 		'image: placeholder',
			 	// 	// 		'hashtags: placeholder',
			 	// 	// 		'comment: placeholder',
			 	// 	// 		{socialvibe: dbStatus.statusID}
					// 	// );

					// 	if (fbInDB) {

					// 		// renderStatusInstance = new StatusPost(
				 // 		// 		(req.user.profile.firstName + ' ' + req.user.profile.lastName),
				 // 		// 		req.user.uniqueURL,
				 // 		// 		req.user.profile.image,
				 // 		// 		dbStatus.creationTime,
				 // 		// 		'socialvibe',
				 // 		// 		dbStatus.creationTime,
				 // 		// 		dbStatus.updateTime,
				 // 		// 		'text: placeholder',
				 // 		// 		'image: placeholder',
				 // 		// 		'hashtags: placeholder',
				 // 		// 		'comment: placeholder',
				 // 		// 		{socialvibe: dbStatus.statusID}
					// 		// );
					// 		// renderStatusInstance.mediaType.facebook = fbInDB.statusID;
					// 		// renderStatusInstance.text = fbInDB.text;
					// 		// renderStatusInstance.hashtag = fbInDB.hashtag;
					// 		// renderStatusInstance.comment = fbInDB.comment;

					// 		renderStatusInstance = onlyFBStatusInstance;
							
					// 		if (twInDB) {
					// 			renderStatusInstance.mediaType.twitter = twInDB.statusID;
					// 			if (twInDB.creationTime > fbInDB.creationTime) {
					// 				renderStatusInstance.updateTime = twInDB.creationTime;
					// 			}
					// 			else {
					// 				renderStatusInstance.updateTime = fbInDB.creationTime;
					// 				// renderStatusInstance.mediaType.facebook = fbInDB.statusID;
					// 			}
					// 		}
					// 	}

					// 	else if (twInDB) {
					// 		renderStatusInstance = onlyTWStatusInstance;

					// 		// renderStatusInstance.mediaType.twitter = twInDB.statusID;
					// 		// renderStatusInstance.text = twInDB.text;
					// 		// renderStatusInstance.hashtag = twInDB.hashtag;
					// 		// renderStatusInstance.comment = twInDB.comment;
					// 		// renderStatusInstance.mediaType.facebook = twInDB.statusID;
					// 	}

					// 	else {
					// 		return false;
					// 	}
					// 	renderStatusInstance.mediaType.socialvibe = dbStatus.statusID;						
					// }
/*~~~~~~~~~~~~~~~~~~~~ END VIBE WAS THE SOURCE ~~~~~~~~~~~~~~~~~~~~*/






					// Check for DB statuses in FB && TW
					if (fbInDB && twInDB) {
console.log("Double match");
						// Use FB status and update if source is SOCIALVIBE
						if (dbStatus.source === 'socialvibe') {
console.log("Both");
							renderStatusInstance = fbInDB;
							renderStatusInstance.source = 'socialvibe';
							renderStatusInstance.mediaType.twitter = twInDB.statusID;
							renderStatusInstance.mediaType.socialvibe = dbStatus.creationTime;
							renderStatusInstance.statusID = dbStatus.statusID;
							renderStatusInstance.creationTime = Number(dbStatus.creationTime);

							renderStatusInstance.socialvibe = Number(dbStatus.creationTime);
							renderStatusInstance.revibed = ['facebook', 'twitter'];


console.log(renderStatusInstance);
							if (twInDB.creationTime > fbInDB.creationTime) {
								renderStatusInstance.updateTime = twInDB.creationTime;
								renderStatusInstance.creationTime = fbInDB.creationTime;
							}
							else {
								renderStatusInstance.updateTime = fbInDB.creationTime;
								renderStatusInstance.creationTime = twInDB.creationTime;
							}
						}

						// Use FB status and update if source is FACEBOOK
						else if (dbStatus.source === 'facebook') {
							renderStatusInstance = fbInDB;
							renderStatusInstance.mediaType.twitter = twInDB.statusID;
							renderStatusInstance.updateTime = twInDB.creationTime;

							renderStatusInstance.facebook = fbInDB.statusID;
							renderStatusInstance.revibed = ['twitter'];

						}
						// Use TW status and update if source is TWITTER
						else if (dbStatus.source === 'twitter') {
							renderStatusInstance = twInDB;
							renderStatusInstance.mediaType.facebook = fbInDB.statusID;
							renderStatusInstance.updateTime = fbInDB.creationTime;

							renderStatusInstance.twitter = twInDB.creationTime;
							renderStatusInstance.revibed = ['facebook'];

						}
						
					}/*--------------------- END DUPLICATE FILTER ---------------------*/

					else if (fbInDB && !twInDB) {
						renderStatusInstance = fbInDB;
						// Use FB status and UPDATE if source is SOCIALVIBE
// console.log('Facebook POST TIME 0', renderStatusInstance.creationTime, typeof renderStatusInstance.creationTime);
// console.log('DB POST TIME 0', dbStatus.creationTime, typeof renderStatusInstance.creationTime);
						if (dbStatus.source === 'socialvibe') {
							renderStatusInstance.source = 'socialvibe';
							renderStatusInstance.mediaType.socialvibe = Number(dbStatus.creationTime);
							renderStatusInstance.creationTime = Number(dbStatus.creationTime);
							renderStatusInstance.statusID = dbStatus.statusID;


							renderStatusInstance.socialvibe = Number(dbStatus.creationTime);
console.log("SoialVibe Facebook Only");
console.log(renderStatusInstance);
// console.log('CREATION TIME', dbStatus.creationTime, typeof dbStatus.creationTime);
// console.log('DB POST TIME 0', dbStatus.creationTime, typeof renderStatusInstance.creationTime);

						}

					}

					else if (twInDB && !fbInDB) {
						renderStatusInstance = twInDB;

						// Use FB status and UPDATE if source is SOCIALVIBE
						if (dbStatus.source === 'socialvibe') {
							renderStatusInstance.source = 'socialvibe';

							renderStatusInstance.socialvibe = Number(dbStatus.creationTime);
							renderStatusInstance.statusID = dbStatus.statusID;

					// console.log('POST TIME 1', renderStatusInstance.creationTime);

							renderStatusInstance.mediaType.socialvibe = dbStatus.creationTime;
							renderStatusInstance.creationTime = Number(dbStatus.creationTime);
console.log("SoialVibe Twitter Only");
console.log(renderStatusInstance);
						}
					}
					

					// Return the status instance to be rendered to the
					// renderStatusArray 
					return renderStatusInstance;

				}); // - END DB MAP

		
				// Combine the array of DB matched status instances
				// 1.)	with the unmatched FACEBOOK status instances
				// 2.)	with the unmatched TWITTER status instances
				var allRenderableStatus = renderStatusArray.concat(FB_statusArray.concat(TW_statusArray));
// console.log('Renderable Status Array:', allRenderableStatus);

				// Sort the output status array by date
				var rawOutputStatuses = _.compact(allRenderableStatus);
				var outputStatuses =  _.sortBy(rawOutputStatuses, function(status) {
						return -1 * moment(status.creationTime).valueOf();
				});


				/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
							+++++++++++ SAVE THE DATABSE +++++++++++
				=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
				// Update the database with the information from the renderable statuses
				var DB_update = outputStatuses.map(function(status){
					// console.log('DB save: Post:', status);
						return {
							statusID: status.statusID,
							source: status.source,
							creationTime: status.creationTime,
							updateTime: status.updateTime,
							mediaSources: status.mediaType
						};
				});
			// console.log('DATABASE LENGTH:', req.user.statuses.length);
				// Save the Database
				// console.log('DB update::', DB_update);
				req.user.statuses = DB_update;
				req.user.markModified('posts');
				req.user.save(function(err, user) {
					if (err) {
						console.log("Database Save Error:", err);
					}
// console.log('DATABASE LENGTH SAVED:', req.user.statuses.length);
				// console.log('Database direct', req.user.statuses);
				});
				/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
						----------- END SAVE THE DATABSE -----------
				=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/



/*--------------------RE-RENDER THE ENTIRE PAGE ------------*/
			if (req.renderAll) {


				var formattedOutput =  _.map(outputStatuses, function(status) {
					status.creationTime = moment(status.creationTime).calendar();	
					status.updateTime = moment(status.updateTime).calendar();
					return status;
				});

				console.log('Entire Page Render');
				// Send the organized array of statuses
				callback(formattedOutput);
				// console.log("POST", formattedOutput);
			}

/*--------------------RENDER CHANGED STATUSES  ------------*/
			if (!req.renderAll) {

				console.log('Update Render');
	// console.log("OUTPUT STATUSES:", outputStatuses);
console.log('REFERENCE TIME', referenceTime);
				var updatedStatuses =  _.filter(outputStatuses, function(status) {

					if (status.creationTime > referenceTime || status.updateTime > referenceTime) {
						console.log("STATUS TIME:", status.creationTime, typeof status.creationTime);
						console.log("UPDATE TIME:", status.updateTime, typeof status.updateTime);
						status.creationTime = moment(status.creationTime).calendar();
						status.updateTime = moment(status.updateTime).calendar();
						console.log("STATUS TIME FORMAT:", status.creationTime, typeof status.creationTime);
						console.log("UPDATE TIME FORMAT:", status.updateTime,  typeof status.updateTime);
						return true;
					}
						return false;
				});

				// console.log("UPDATE STATUSES:", updatedStatuses);
				callback(updatedStatuses);
			}


		}); // - END ASYNC
	}

};
module.exports = allAPIController;