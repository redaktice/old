$(document).on('ready', function() {

	var templateFB = $('#fb-template').html();
	var postTemplateFunc = Handlebars.compile(templateFB);
console.log('status', responseStatus);
	var postFacebookHTML = postTemplateFunc(responseStatus);
	$('#feed').prepend(postFacebookHTML);


	// var getStatusText = function(){
	// 	var statusText = $(this).find('post-text').text();
	// };

});