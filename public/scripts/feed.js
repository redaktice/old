$(document).on('ready', function() {

	var templateFB = $('#fb-template').html();
	var postTemplateFunc = Handlebars.compile(templateFB);

	var postFacebookHTML = postTemplateFunc(status);
	$('#feed').prepend(postFacebookHTML);

});