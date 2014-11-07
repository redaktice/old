$(document).on('ready', function() {
$('#user-twitter').hide();
	$('.pop-up').toggle();

	$('.pop-up-toggle').on('click', function() {
		$('.pop-up').slideToggle(900);
	});



/*=====Add New Social Meida=====*/

	// Add new social media to the user profile
	$('#incorporate-media').on('click', function() {
		// $.post('/profile', {userLogin: loginInfo}, function(){});
		$('#user-twitter').show();
	});

	// Sign the user into twitter
	$('#user-twitter').on('click', function() {
		// Login to twitter
	});


	// LOOK UP JQUERY UI FOR OTHER SLIDE FEATURES

});