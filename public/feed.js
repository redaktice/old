$(document).on('ready', function() {

	var templateFB = $('#fb-template');
	var postTemplateFunc = Handlebars.compile(templateFB);

	var postFacebookHTML = postTemplateFunc(postObject);
	$('FEED').prepend(postFacebookHTML);

});