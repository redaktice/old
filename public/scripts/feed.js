$(document).on('ready', function() {


// DISPLAY STATUSES
	var statusTemplate = $('#status-post-template').html();
	var statusPostTemplateFunc = Handlebars.compile(statusTemplate);
// console.log('facebook status', renderedPosts);
	
	var statusPostsHTML = renderedPosts.map(function(statusPost) {
		return statusPostTemplateFunc(statusPost);
	});
	// var statusPostHTML = statusPostTemplateFunc({statusPosts: renderedPosts});
// console.log(renderedPosts);
	$('#feed').append(statusPostsHTML);

// console.log(statusPostsHTML);








// DISPLAY TWITTER STATUSES
// 	var templateTW = $('#tw-template').html();
// 	var postTWTemplateFunc = Handlebars.compile(templateTW);
// console.log('twitter timeline', twitterTimeline);
// 	var postTwitterHTML = postTWTemplateFunc({userTweets: twitterTimeline});
// 	$('#feed').prepend(postTwitterHTML);

	// $('#feed').prepend('<h1>Hello World</h1>');

	// var getStatusText = function(){
	// 	var statusText = $(this).find('post-text').text();
	// };
// var facebookIndicator = '<i class="icon icon-btn facebook media-circle-md fa fa-facebook"></i>';

// Pushing to facebook
$('.push-facebook').on('click', function(e) {
	var nthis = $(this);
	var postID = nthis.closest('.status-post').attr('data-post-id');
	var postContent = nthis.closest('.status-post').find('.post-text').text();
	
	$.post('/status/revibe/' + postID + '/facebook', {content: postContent}, function(response) {
	
// debugger;	
// var updatedStatusPostsHTML = 
		response.map(function(newPost) {
		var updateable = $('[data-post-id=' + response.postID + ']');
			var newStatusHTML = statusPostTemplateFunc(newPost);
			if (updateable.length === 0) {
				$('#feed').prepend(newStatusHTML);
			}

			else {
				updateable.replaceWith(newStatusHTML);
			}
			
		});
		// UPDATE THE HANDLEBARS ELEMENT

	});

	// e.preventDefault();

	// var nthis = $(this);
	// var userID = nthis.closest('.status-post').attr('user-id');

	// // console.log('PostID', postID);
	// // console.log('Post Content', postContent);
	
	// for (var i = 0; i < renderedPosts.length; i++) {
	// 	if (renderedPosts[i].postID === postID) {
	// 		return;
	// 	}
	// }
	// // if (_.findWhere(renderedPosts, {postID: postID})) {
	// // 	return;
	// // } 
	// // else {
		
	// 	$.post('/status/pushFacebook',{postID: postID, userID: userID, content: postContent}, function(responseData){
	// 		// console.log('responseData', responseData);


	// 	 // RECEIVE DATA FROM AJAX GET REQUESET
	// 	 		$.post('/status/updateStatus/', {userID: userID}, function(updatedPostsArray) {

	// 				var newestPosts = updatedPostsArray;
	// 	 			// Get an array of posts not already rendered

	// 	 			for (var i = 0; i < renderedPosts.length; i++) {
	// 	 			/*	
	// 	 				if (_.findWhere(renderedPosts, {postID: updatedPostsArray[i].postID})) {
	// 	 			/*/	
	// 	 			// var singlePost = updatedPostsArray[i];
	// 	 				for (var j = i; j < updatedPostsArray.length; j++) {
	// 	 					if (updatedPostsArray[j].postID === renderedPosts[i].postID) {
	// 	 						newestPosts.splice(j, 1);

	// 				console.log('Newest Posts', newestPosts.length, newestPosts);
	// 	 						// return newestPosts;
	// 	 					}
	// 	 				}
	// 	 			//*/
	// 	 					// break;
	// 	 				// } else {
	// 	 				// 	console.log('Unmatched', updatedPostsArray[i]);
	// 	 				// 	newestPosts.push(updatedPostsArray[i]);
	// 	 				// }
	// 	 			}
	// 				console.log('Updated Posts Array', updatedPostsArray.length, updatedPostsArray);
	// 				console.log('Rendered Posts', renderedPosts.length, renderedPosts);
	// 				console.log('Newest Posts', newestPosts.length, newestPosts);
	// 	 			var newStatusPostHTML = statusPostTemplateFunc({statusPosts: newestPosts});

	// 	 			// Prepend newest status posts
	// 	 			if (newestPosts.length > 0) {
	// 		 			$('#feed').prepend(newStatusPostHTML);
	// 	 			}

	// 	 			// Update the total posts array
	// 	 			renderedPosts = updatedPostsArray;
	// 	 		});

	// 	 		// nthis.hide();

	// 			// DISPLAY STATUSES
	// 	// console.log('facebook status', renderedPosts);
	// 		// if (responseData) {
	// 		// 	var newStatusPostHTML = statusPostTemplateFunc({statusPosts: [responseData]});
	// 		// 	$('#feed').prepend(newStatusPostHTML);
	// 		// 	// $.get(responseData, function(data, status) {});
	// 		// }
	// 	});




	// 	// $.post('/api/pushFacebook',{postID: postID, userID: userID, content: postContent}, function(responseData){
	// 	// 	console.log("facebook push", responseData);
	// 	// });
	// 	nthis.closest('.status-post').append('<p>' + postContent + '</p>');
	// // }

});













/*

// DISPLAY STATUSES

// console.log(renderedPosts);

// Pushing to facebook
$('.push-facebook').on('click', function(e) {
	e.preventDefault();

	 // RECEIVE DATA FROM AJAX GET REQUESET
	 		$.post('status/updateStatus/', {userID: userID}, function(postsArray) {

	 			// Get an array of posts not already rendered
	 			var newestPosts = _.difference(postsArray, renderedPosts);
	 			var newStatusPostHTML = statusPostTemplateFunc({newStatusPosts: newestPosts});

	 			// Prepend newest status posts
	 			$('#feed').prepend(statusPostHTML);

	 			// Update the total posts array
	 			renderedPosts = postsArray;
	 		});

});



*/


// Creating a new Vibe post

$('#new-post').on('keyup', function() {
	var message = $('#new-post').val();
	if (message.length > 0) {
		$('#character-count').text(message.length + ' Char.');
	} else {
		$('#character-count').text('');
	}
});

$('#generate-post .vibe').on('click', function(e) {
	var newMessage = $('#new-post').val();
	e.preventDefault();
	if (newMessage.length > 140  /* && TWITTER IS SELECTED */) {
		alert('PLEASE MODIFY TO 140 CHARACTERS FOR TWITTER');
	} else {
		// VIBE TO THE SELECTED MEDIA
		$.post();
	}
});

});




// $('.push-facebook').on('click', function(e) {
// 	e.preventDefault();

// 	var nthis = $(this);
// 	var postID = nthis.closest('.status-post').attr('data-post-id');
// 	var userID = nthis.closest('.status-post').attr('user-id');

// 	// console.log('PostID', postID);
// 	var postContent = nthis.closest('.status-post').find('.post-text').text();
// 	// console.log('Post Content', postContent);
	
// 	for (var i = 0; i < renderedPosts.length; i++) {
// 		if (renderedPosts[i].postID === postID) {
// 			return;
// 		}
// 	}
// 	// if (_.findWhere(renderedPosts, {postID: postID})) {
// 	// 	return;
// 	// } 
// 	// else {
		
// 		$.post('/status/pushFacebook',{postID: postID, userID: userID, content: postContent}, function(responseData){
// 			// console.log('responseData', responseData);


// 		 // RECEIVE DATA FROM AJAX GET REQUESET
// 		 		$.post('/status/updateStatus/', {userID: userID}, function(updatedPostsArray) {

// 					var newestPosts = updatedPostsArray;
// 		 			// Get an array of posts not already rendered

// 		 			for (var i = 0; i < renderedPosts.length; i++) {
// 		 			/*	
// 		 				if (_.findWhere(renderedPosts, {postID: updatedPostsArray[i].postID})) {
// 		 			/*/	
// 		 			// var singlePost = updatedPostsArray[i];
// 		 				for (var j = i; j < updatedPostsArray.length; j++) {
// 		 					if (updatedPostsArray[j].postID === renderedPosts[i].postID) {
// 		 						newestPosts.splice(j, 1);

// 					console.log('Newest Posts', newestPosts.length, newestPosts);
// 		 						// return newestPosts;
// 		 					}
// 		 				}
// 		 			//*/
// 		 					// break;
// 		 				// } else {
// 		 				// 	console.log('Unmatched', updatedPostsArray[i]);
// 		 				// 	newestPosts.push(updatedPostsArray[i]);
// 		 				// }
// 		 			}
// 					console.log('Updated Posts Array', updatedPostsArray.length, updatedPostsArray);
// 					console.log('Rendered Posts', renderedPosts.length, renderedPosts);
// 					console.log('Newest Posts', newestPosts.length, newestPosts);
// 		 			var newStatusPostHTML = statusPostTemplateFunc({statusPosts: newestPosts});

// 		 			// Prepend newest status posts
// 		 			if (newestPosts.length > 0) {
// 			 			$('#feed').prepend(newStatusPostHTML);
// 		 			}

// 		 			// Update the total posts array
// 		 			renderedPosts = updatedPostsArray;
// 		 		});

// 		 		// nthis.hide();

// 				// DISPLAY STATUSES
// 		// console.log('facebook status', renderedPosts);
// 			// if (responseData) {
// 			// 	var newStatusPostHTML = statusPostTemplateFunc({statusPosts: [responseData]});
// 			// 	$('#feed').prepend(newStatusPostHTML);
// 			// 	// $.get(responseData, function(data, status) {});
// 			// }
// 		});



