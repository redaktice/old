
// Look for changes/updates since reference time


var	updateStatus = function (req, callback) {

var referenceTime = new Date().getTime();

		var DB_statuses = req.user.posts;

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
						return (fbStatus.postID === dbStatus.media.facebook);
					});
					// If status exists in FB, remove the status from FB array
					if (fbInDB) {

						// Assign reference to FB status instance to be rendered
						onlyFBStatusInstance = fbInDB;
						onlyFBStatusInstance.mediaType.facebook = fbInDB.postID;

						// Remove the fbInDB status from FB array
						FB_statusArray = _.reject(FB_statusArray, function(foundStatus){
							return (foundStatus.postID === fbInDB.postID);
						});
					}/*--------------------- END FACEBOOK SEARCH ---------------------*/



					/*+++++++++++++++++++++ SEARCH DB IN TWITTER +++++++++++++++++++++*/
					
					var onlyTWStatusInstance;
					// Look for the DB status in TWITTER
					// Return the TW status object
					var twInDB = _.find(TW_statusArray, function(twStatus) {
						return (twStatus.postID === dbStatus.media.twitter);
					});

					// If status exists in TW, remove status from TW array
					if (twInDB) {

						// Assign reference to TW status instance to be rendered
						onlyTWStatusInstance = twInDB;
						onlyTWStatusInstance.mediaType.twitter = twInDB.postID;

						// Remove the twInDB satus from the TW array
						TW_statusArray = _.reject(TW_statusArray, function(foundStatus){
							return (foundStatus.postID === twInDB.postID);
						});
					}/*--------------------- END TWITTER SEARCH ---------------------*/


			/*================== GENERATE INSTANCE OF DB-MATCHED STATUSES ==================*/

					/*++++++++++++++++++++++ FILTER DUPLICATES ++++++++++++++++++++++*/
					
					// Check for DB statuses in FB && TW
					if (fbInDB && twInDB) {

						// Use FB status and update if source is FACEBOOK
						if (dbStatus.source === 'facebook') {
							renderStatusInstance = fbInDB;
							renderStatusInstance.mediaType.twitter = twInDB.postID;
							renderStatusInstance.updateTime = twInDB.postTime;
						}

						// Use TW status and update if source is TWITTER
						else if (dbStatus.source === 'twitter') {
							renderStatusInstance = twInDB;
							renderStatusInstance.mediaType.facebook = fbInDB.postID;
							renderStatusInstance.updateTime = fbInDB.postTime;
						}
					}/*--------------------- END DUPLICATE FILTER ---------------------*/

					else if (fbInDB && !twInDB) {
						renderStatusInstance = onlyFBStatusInstance;
					}

					else if (!fbInDB && twInDB) {
						renderStatusInstance = onlyTWStatusInstance;
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
						return -1 * moment(status.postTime).valueOf();
				});



/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
			+++++++++++ SAVE THE DATABSE +++++++++++
=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
				// Update the database with the information from the renderable statuses
				var DB_update = outputStatuses.map(function(status){
					console.log('DB save: Post Source:', status.source);
						return {
							postID: status.postID,
							source: status.source,
							creationTime: status.postTime,
							updateTime: status.updatTime,
							media: status.mediaType
						};
				});
			
				// Save the Database
				// console.log('DB update::', DB_update);
				req.user.posts = DB_update;

				req.user.markModified('posts');
				req.user.save(function(err, user) {
					if (err) {
						console.log("Database Save Error:", err);
					}
				// console.log('Database direct', req.user.posts);
				});
/*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
		----------- END SAVE THE DATABSE -----------
=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/



/*--------------------RE-RENDER THE ENTIRE PAGE ------------*/
			if (req.renderAll) {
				// Send the organized array of statuses
				callback(outputStatuses);
			}

/*--------------------RE-RENDER THE ENTIRE PAGE ------------*/
			if (!req.renderAll) {
				var updatedStatuses =  _.filter(outputStatuses, function(status) {
						return status.postTime > referenceTime;
				});
				callback(updatedStatuses);
			}


		}); // - END ASYNC
	};


// var DB_statuses = req.user.posts;

// 		async.auto({
// 			facebook: facebookControl.getFacebookStatus.bind(null, req.user),
// 				twitter: (req.user.media.twitter && req.user.media.twitter.isActive) ? twitterControl.getTwitterStatus.bind(null, req.user) : function(callback) {callback(null, []);}
// 			}, function(err, results){

// 				var FB_statusArray = results.facebook;
// 				var TW_statusArray = results.twitter;

// 				var renderStatusArray = DB_statuses.map(function(dbStatus){

// 					var renderStatusInstance;

// 					/*+++++++++++++++++++++ SEARCH DB IN FACEBOOK +++++++++++++++++++++*/

// 					var onlyFBStatusInstance;
// 					// Look for the DB status in FACEBOOK
// 					// Return the FB status object
// 					var fbInDB = _.find(FB_statusArray, function(fbStatus) {
// 						return (fbStatus.postID === dbStatus.media.facebook);
// 					});
// 					// If status exists in FB, remove the status from FB array
// 					if (fbInDB) {

// 						// Assign reference to FB status instance to be rendered
// 						onlyFBStatusInstance = fbInDB;
// 						onlyFBStatusInstance.mediaType.facebook = fbInDB.postID;

// 						// Remove the fbInDB status from FB array
// 						FB_statusArray = _.reject(FB_statusArray, function(foundStatus){
// 							return (foundStatus.postID === fbInDB.postID);
// 						});
// 					}/*--------------------- END FACEBOOK SEARCH ---------------------*/



// 					/*+++++++++++++++++++++ SEARCH DB IN TWITTER +++++++++++++++++++++*/
					
// 					var onlyTWStatusInstance;
// 					// Look for the DB status in TWITTER
// 					// Return the TW status object
// 					var twInDB = _.find(TW_statusArray, function(twStatus) {
// 						return (twStatus.postID === dbStatus.media.twitter);
// 					});

// 					// If status exists in TW, remove status from TW array
// 					if (twInDB) {

// 						// Assign reference to TW status instance to be rendered
// 						onlyTWStatusInstance = twInDB;
// 						onlyTWStatusInstance.mediaType.twitter = twInDB.postID;

// 						// Remove the twInDB satus from the TW array
// 						TW_statusArray = _.reject(TW_statusArray, function(foundStatus){
// 							return (foundStatus.postID === twInDB.postID);
// 						});
// 					}/*--------------------- END TWITTER SEARCH ---------------------*/


// 			/*================== GENERATE INSTANCE OF DB-MATCHED STATUSES ==================*/

// 					/*++++++++++++++++++++++ FILTER DUPLICATES ++++++++++++++++++++++*/
					
// 					// Check for DB statuses in FB && TW
// 					if (fbInDB && twInDB) {

// 						// Use FB status and update if source is FACEBOOK
// 						if (dbStatus.source === 'facebook') {
// 							renderStatusInstance = fbInDB;
// 							renderStatusInstance.mediaType.twitter = twInDB.postID;
// 						}

// 						// Use TW status and update if source is TWITTER
// 						else if (dbStatus.source === 'twitter') {
// 							renderStatusInstance = twInDB;
// 							renderStatusInstance.mediaType.facebook = fbInDB.postID;
// 						}
// 					}/*--------------------- END DUPLICATE FILTER ---------------------*/

// 					else if (fbInDB && !twInDB) {
// 						renderStatusInstance = onlyFBStatusInstance;
// 					}

// 					else if (!fbInDB && twInDB) {
// 						renderStatusInstance = onlyTWStatusInstance;
// 					}
					

// 					// Return the status instance to be rendered to the
// 					// renderStatusArray 
// 					return renderStatusInstance;

// 				}); // - END DB MAP

		
// 				// Combine the array of DB matched status instances
// 				// 1.)	with the unmatched FACEBOOK status instances
// 				// 2.)	with the unmatched TWITTER status instances
// 				var allRenderableStatus = renderStatusArray.concat(FB_statusArray.concat(TW_statusArray));
// // console.log('Renderable Status Array:', allRenderableStatus);

// 				// Sort the output status array by date
// 				var rawOutputStatuses = _.compact(allRenderableStatus);
// 				var outputStatuses =  _.sortBy(rawOutputStatuses, function(status) {
// 						return -1 * moment(status.postTime).valueOf();
// 				});



// /*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
// 			+++++++++++ SAVE THE DATABSE +++++++++++
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/
// 				// Update the database with the information from the renderable statuses
// 				var DB_update = outputStatuses.map(function(status){
// 					console.log('DB save: Post Source:', status.source);
// 						return {postID: status.postID, source: status.source, media: status.mediaType};
// 				});
			
// 				// Save the Database
// 				// console.log('DB update::', DB_update);
// 				req.user.posts = DB_update;

// 				req.user.markModified('posts');
// 				req.user.save(function(err, user) {
// 					if (err) {
// 						console.log("Database Save Error:", err);
// 					}
// 				// console.log('Database direct', req.user.posts);
// 				});
// /*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/ 
// 		----------- END SAVE THE DATABSE -----------
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/*/


// 	var resorted =  _.sortBy(outputStatuses, function(status) {
// 						return -1 * moment(status.postTime).valueOf();
// 				});
// 				// Send the organized array of statuses
// 				callback(resorted);

// 		}); // - END ASYNC
// 	}
