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

});

