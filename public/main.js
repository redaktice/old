$(document).on('ready', function() {

	$('.pop-up').toggle();

	$('.pop-up-toggle').on('click', function() {
		$('.pop-up').slideToggle(900);
	});

	$('#login').on('click', function() {
		// $.post('/profile', {userLogin: loginInfo}, function(){});
	});


	// LOOK UP JQUERY UI FOR OTHER SLIDE FEATURES

});