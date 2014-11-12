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
	
	$.post('/status/revibe/' + postID + '/facebook', {postID: postID, content: postContent}, function(response, status, jXHR) {
// debugger;	
// var updatedStatusPostsHTML = 
		response.map(function(newPost) {
			var postID = newPost.postID;
			var updateable = $('[data-post-id=' + postID + ']');
			var newStatusHTML = statusPostTemplateFunc(newPost);
		
			if (updateable.length === 0) {
				$('#feed').prepend(newStatusHTML);
				console.debug('PREPEND');
			}

			else {
				updateable.replaceWith(newStatusHTML);
			}
			
		});
		// UPDATE THE HANDLEBARS ELEMENT
	}, "json");

});


$('.push-twitter').on('click', function(e) {


console.log('Push Twitter');
	e.preventDefault();

	var nthis = $(this);
	var postID = nthis.closest('.status-post').attr('data-post-id');
	var postContent = nthis.closest('.status-post').find('.post-text').text();

	if (postContent.length > 140  /* && TWITTER IS SELECTED */) {
		alert('MESSAGE OVER 140 CHARACTERS. TOO MUCH FOR TWITTER :(');
	}
	else {
		$.post('/status/revibe/' + postID + '/twitter', {postID: postID, content: postContent}, function(response, status, jXHR) {
		console.debug(response);
		
	// debugger;	
	// var updatedStatusPostsHTML = 
			response.map(function(newPost) {
				var postID = newPost.postID;

			console.debug("Post ID", postID);
				var updateable = $('[data-post-id=' + postID + ']');

			console.debug('Updateable', updateable);
				var newStatusHTML = statusPostTemplateFunc(newPost);
				if (updateable.length === 0) {
					$('#feed').prepend(newStatusHTML);

			console.debug('PREPEND');
				}

				else {
					updateable.replaceWith(newStatusHTML);
				}
				
			});

		}, "json");
	}
});



$('.vibe-to').on('click', function(){
	$(this).toggleClass('selected');
});


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
	e.preventDefault();

	var postContent = $('#new-post').val();
	var hashtags = $('#tag-post').val();

	var vibeFacebook = false;
	var vibeTwitter = false;

	if ($('#vibe-facebook').hasClass('selected')) {
		vibeFacebook = true;
	}
	if ($('#vibe-twitter').hasClass('selected')) {
		vibeTwitter = true;
	}
	if ($('#vibe-all').hasClass('selected')) {
		vibeTwitter = true;
		vibeFacebook = true;
	}

	if (vibeTwitter && postContent.length > 140  /* && TWITTER IS SELECTED */) {
		alert('MESSAGE OVER 140 CHARACTERS. TOO MUCH FOR TWITTER :(');
	}
	else {
		// VIBE TO THE SELECTED MEDIA
		$.post('/status/vibe', {content: postContent, hashtags: hashtags, vibeFacebook: vibeFacebook, vibeTwitter: vibeTwitter}, function(response, status, jXHR){
		
			response.map(function(newPost) {
				var newStatusHTML = statusPostTemplateFunc(newPost);
				$('#feed').prepend(newStatusHTML);
			});

			$('vibe-to').removeClass('selected');

		}, "json");
	}
});



}); // --> END JQUERY
