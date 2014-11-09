$(document).on('ready', function() {


// DISPLAY FACEBOOK STATUSES
	var statusTemplate = $('#status-post-template').html();
	var statusPostTemplateFunc = Handlebars.compile(statusTemplate);
console.log('facebook status', userPosts);
	var statusPostHTML = statusPostTemplateFunc({statusPosts: userPosts});
	$('#feed').prepend(statusPostHTML);

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

