$(document).on('ready', function() {


// RENDER ALL STATUS POSTS
	var statusTemplate = $('#status-post-template').html();
	var statusPostTemplateFunc = Handlebars.compile(statusTemplate);
// console.log('facebook status', renderedPosts);
	
	var statusPostsHTML = renderedPosts.map(function(statusPost) {
// console.log(statusPost);
		// var postHTML = statusPostTemplateFunc(statusPost);
		// $(postHTML).find('.status-post').addClass('source-' + statusPost.source);
		// return postHTML;
		return statusPostTemplateFunc(statusPost);
	});
	$('#feed').append(statusPostsHTML);

	// var statusPostHTML = statusPostTemplateFunc({statusPosts: renderedPosts});
console.log(renderedPosts);
	// console.log('ONE POST', renderedPosts[0]);
	
	// var feed = $('#feed');

	// renderedPosts.map(function(post){
	// 	for (var key in post.mediaType) {
	// 		console.log('KEY', key);

	// 		feed.children('[data-post-id="' + post.statusID + '"]').addClass('vibe-' + key);
	// 	}
	// console.debug(statusPostsHTML);
	// });

// console.log(statusPostsHTML);

$('#filter-all').addClass('selected');
$('#filter-facebook, #filter-twitter').removeClass('selected');


if (userMedia.twitter) {
	$('.twitter').show();
	$('#login-twitter .twitter').hide();
}
else {
	$('.twitter').hide();

}
// console.log("userMedia", userMedia);
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
												~~~~ REVIBE ~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


/*++++++++++++++++++++++++++++++ PUSH FACEBOOK +++++++++++++++++++++++++++++++*/

	// Pushing to facebook
	$('#feed').on('click', '.push-facebook', function(e) {

		console.log('CLICKED');

		var nthis = $(this);
		console.log('nthis', nthis);
		var statusID = nthis.closest('.status-post').attr('data-post-id');
		var postContent = nthis.closest('.status-post').find('.post-text').text();
		
		$.post('/status/revibe/' + statusID + '/facebook', {statusID: statusID, content: postContent}, function(response, status, jXHR) {

			console.log('FB push response', response);
	// debugger;	
	// var updatedStatusPostsHTML = 
			response.map(function(newPost) {
				var statusID = newPost.statusID;
				var updateable = $('[data-post-id=' + statusID + ']');
				var newStatusHTML = statusPostTemplateFunc(newPost);
				var clickedStatus =  nthis.closest('.status-post');

				console.log(clickedStatus.attr('data-post-id'));
				// if (clickedStatus.attr('data-post-id') === statusID) {
				// 	console.log('found');
				// 	clickedStatus.replaceWith(newStatusHTML);
				// }
			
				if (updateable.length === 0) {
					$('#feed').prepend(newStatusHTML);
					console.debug('PREPEND');
				}

				else {
					updateable.replaceWith(newStatusHTML);
					console.log('Replace');
				}
				
			});
			// UPDATE THE HANDLEBARS ELEMENT
		}, "json");
	
		nthis.fadeOut(500);
	});

/*++++++++++++++++++++++++++++++ PUSH TWITTER +++++++++++++++++++++++++++++++*/

	$('#feed').on('click', '.push-twitter',function(e) {
	// console.log('Push Twitter');
		e.preventDefault();

		var nthis = $(this);
		var statusID = nthis.closest('.status-post').attr('data-post-id');
		var postContent = nthis.closest('.status-post').find('.post-text').text();

		if (postContent.length > 140  /* && TWITTER IS SELECTED */) {
			alert('MESSAGE OVER 140 CHARACTERS. TOO MUCH FOR TWITTER :(');
		}
		else {
			$.post('/status/revibe/' + statusID + '/twitter', {statusID: statusID, content: postContent}, function(response, status, jXHR) {
			// console.debug(response);
			
		// debugger;	
		// var updatedStatusPostsHTML = 
				response.map(function(newPost) {
					var statusID = newPost.statusID;

				// console.debug("Post ID", statusID);
					var updateable = $('[data-post-id=' + statusID + ']');

				// console.debug('Updateable', updateable);
					var newStatusHTML = statusPostTemplateFunc(newPost);
					nthis.replaceWith(newStatusHTML);
					if (updateable.length === 0) {
						newStatusHTML.addClass('new');
						$('#feed').prepend(newStatusHTML);

				// console.debug('PREPEND');
					}

					else {
						// newStatusHTML.addClass('updated');
						updateable.replaceWith(newStatusHTML);
					}
					
				});

			}, "json");
		}

		nthis.fadeOut(500);

	});

/*------------------------------------------------------------------------------------------------------------- 
											~~~~ END REVIBE ~~~~
 -------------------------------------------------------------------------------------------------------------*/





/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
												~~~~ ORIGINAL VIBE ~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
	$('#vibe-all').on('mousedown', function() {
		if ($('this').hasClass('selected')) {
			$('#vibe-facebook').addClass('selected');
			$('#vibe-twitter').addClass('selected');
		}
		else {
			$('#vibe-facebook').removeClass('selected');
			$('#vibe-twitter').removeClass('selected');
		}
		$(this).toggleClass('selected');
	});

	$('#vibe-facebook, #vibe-twitter').on('mousedown', function() {
		if ($('#vibe-all').hasClass('selected')) {
			$('#vibe-all').removeClass('selected');
			// $('#vibe-twitter').removeClass('selected');
		}
		// else {
		// 	$('#vibe-facebook').addClass('selected');
		// 	$('#vibe-twitter').addClass('selected');
		// }
		$(this).toggleClass('selected');
	});

	$('.media-vibe').on('mouseup', function() {
		// $(this).toggleClass('selected');
	
		if ($('#vibe-all').hasClass('selected')) {
			// $('#vibe-facebook').removeClass('selected');
			// $('#vibe-twitter').removeClass('selected');
			// vibeStatuses('any');
console.log('ALL?');
		}

		else {
			if ($('vibe-facebook').hasClass('selected') && $('vibe-Twitter').hasClass('selected')){
				// vibeStatuses('all');
console.log('BOTH?');
				// $('#vibe-all').removeClass('selected');
			}
			else if (vibeFB.hasClass('selected')){
				// vibeStatuses('facebook');
console.log('FACEBOOK?');
			}
			else if (vibeTW.hasClass('selected')) {
				// vibeStatuses('twitter');
console.log('TWITTER?');
			}
			else {
				$('#vibe-all').addClass('selected');
console.log('NONE?');
				// filterStatuses('any');
			}
		}
	});





	$('#generate-post').on('click', function(e) {
		e.preventDefault();

		$('#post-menu').fadeToggle(500);
		$('#vibe-all').addClass('selected');
		// $('#vibe-facebook').removeClass('selected');
		// $('#vibe-twitter').removeClass('selected');
		$('#new-post').val('');
		$('#tag-post').val('');
		$('#character-count').text('');

	});

	$('#vibe-modal .vibe').on('click', function(e) {
		// e.preventDefault();
console.log('VIBE');
		var postContent = $('#new-post').val();
		var hashtags = $('#tag-post').val();

		var vibeFacebook = false;
		var vibeTwitter = false;

		if ($('#vibe-facebook').hasClass('selected')) {
			vibeFacebook = 'vibe';
		}
		if ($('#vibe-twitter').hasClass('selected')) {
			vibeTwitter = 'vibe';
		}
		if ($('#vibe-all').hasClass('selected')) {
			vibeTwitter = 'vibe';
			vibeFacebook = 'vibe';
		}

		if (vibeTwitter && postContent.length > 140  /* && TWITTER IS SELECTED */) {
			alert('MESSAGE OVER 140 CHARACTERS. TOO MUCH FOR TWITTER :(');
		}
		else {
			// VIBE TO THE SELECTED MEDIA
			$.post('/status/vibe', {content: postContent, hashtags: hashtags, vibeFacebook: vibeFacebook, vibeTwitter: vibeTwitter}, function(response, status, jXHR){
			// console.debug('Twitter?', vibeTwitter);
				response.map(function(newPost) {
					var newStatusHTML = statusPostTemplateFunc(newPost);
					$('#feed').prepend(newStatusHTML);
				});

				$('vibe-to').removeClass('selected');

			}, "json");
		}
	});






/*------------------------------------------------------------------------------------------------------------- 
											~~~~ END ORIGINAL VIBE ~~~~
 -------------------------------------------------------------------------------------------------------------*/




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
												~~~~ FILTER VIBE ~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var filterFB = $('#filter-facebook');
	var filterTW = $('#filter-twitter');
	// var filterALL = $('#filter-all');

	if ($('#filter-all').hasClass('selected')) {
		filterFB.addClass('selected');
		filterTW.addClass('selected');
	}


	var filterStatuses = function(searchParam) {

		var filterOne = function(media) {
				var unmatched = $('.post').filter(function(){
				var match = false;
				// for (var i = 0; i < searchList.length; i++) {
				if($(this).find('.vibed-' + media).length > 0) {
					match = true;
					$(this).show();
					// break;
					}
				// }
				return !match;
			});
					console.log('Not Single', unmatched.length);

			unmatched.hide();
		
		};

		var filterAny = function(paramArray) {
			var unmatched = $('.post').filter(function(){
				var match = false;
				for (var i = 0; i < paramArray.length; i++) {
					if($(this).find('.vibed-' + paramArray[i]).length > 0) {
						match = true;
						$(this).show();
						break;
					}
				}
				return !match;
			});

			unmatched.hide();
		
		};

		var filterALL = function() {


			var unmatched = $('.post').filter(function(){
				var match = false;

				if ($(this).find('.vibed-facebook').length > 0 && $(this).find('.vibed-twitter').length > 0) {
					match = true;
					$(this).show();
				}
				// for (var i = 0; i < paramArray.length; i++) {
				// 	var partialMatch = $(this).find('.vibed-facebook');
				// 	if(partialMatch.length > 0 && $(this).find('.vibed-twitter')) { //} + paramArray[i]).length > 0) {
				// 			match = true;
				// 			$(this).show();
				// 			break;
						
				// 	}
				// 	else {
				// 		match = false;
				// 	}
				// }
				return !match;
			});
			console.log('Not both', unmatched.length);
			unmatched.hide();
		};

		switch (searchParam) {
			case 'any':
				filterAny(['facebook', 'twitter']);
				break;

			case 'facebook':
				filterOne('facebook');
				break;

			case 'twitter':
				filterOne('twitter');
				break;

			case 'all':
				filterALL();
				break;
		}
	};


		/*
		if (searchList.length === 0) {
			$('.post').show();
		}
		else if (searchList.length === 1){

			var unmatched = $('.post').filter(function(){
				var match = false;
				for (var i = 0; i < searchList.length; i++) {
					if($(this).find('.vibed-' + searchList[i]).length > 0) {
						match = true;
						$(this).show();
						break;
					}
				}
				return !match;
			});
			unmatched.hide();
		}
		else {

		console.log('double match');
			var unmatchedALL = $('.post').filter(function(){
			var matched = false;
			for (var i = 0; i < searchList.length; i++) {
				var matchedOne = $(this).find('.vibed-' + searchList[i]))
			if (matchedOne.length > 0 && matchedOne.hasClass()) {
					matched = true;
					$(this).show();
					break;
				}
			}
			return !matched;
		});
		unmatchedALL.hide();
		}
	};*/

	$('#filter-all').on('mousedown', function() {
		if ($('this').hasClass('selected')) {
			$('#filter-facebook').addClass('selected');
			$('#filter-twitter').addClass('selected');
		}
		else {
			$('#filter-facebook').removeClass('selected');
			$('#filter-twitter').removeClass('selected');
		}
		$(this).toggleClass('selected');
	});

	$('#filter-facebook, #filter-twitter').on('mousedown', function() {
		if ($('#filter-all').hasClass('selected')) {
			$('#filter-all').removeClass('selected');
			// $('#filter-twitter').removeClass('selected');
		}
		// else {
		// 	$('#filter-facebook').addClass('selected');
		// 	$('#filter-twitter').addClass('selected');
		// }
		$(this).toggleClass('selected');
	});

	$('.media-filter').on('mouseup', function() {
		// $(this).toggleClass('selected');
	
		if ($('#filter-all').hasClass('selected')) {
			// $('#filter-facebook').removeClass('selected');
			// $('#filter-twitter').removeClass('selected');
			filterStatuses('any');
console.log('ALL?');
		}

		else {
			if (filterFB.hasClass('selected') && filterTW.hasClass('selected')){
				filterStatuses('all');
console.log('BOTH?');
				// $('#filter-all').removeClass('selected');
			}
			else if (filterFB.hasClass('selected')){
				filterStatuses('facebook');
console.log('FACEBOOK?');
			}
			else if (filterTW.hasClass('selected')) {
				filterStatuses('twitter');
console.log('TWITTER?');
			}
			else {
				$('#filter-all').addClass('selected');
console.log('NONE?');
				filterStatuses('any');
			}
		}
	});


	// $('.vibe-to').on('mousedown', function(){
	// 	$(this).toggleClass('selected');
	// });

	// $('.vibe-to').on('mouseup', function(){

	// 	if ($('#filter-all').hasClass('selected')) {
		
	// 		filterStatuses(['facebook', 'twitter']);
	// 	}
	// 	else {
	// 		if (tilterFB && filterTW) {

	// 		}
	// 	}
	// });

	// $('#filter-facebook').on('click', function(){
	// 	$('#filter-all').removeClass('selected');
	// 	filterStatuses('facebook');
	// });

	// $('#filter-twitter').on('click', function(){
	// 	$('#filter-all').removeClass('selected');
	// 	filterStatuses('twitter');
	// });


	// $('#filter-all').on('click', function(){

	// 	// console.log('CLICK');
	// 	var nthis = $(this);
	// 	nthis.toggleClass('selected');

	// 	$('#filter-facebook').removeClass('selected');
	// 	$('#filter-twitter').removeClass('selected');
	// 	filterStatuses('any');
	// 	// nthis.addClass('selected');
	// 	// $('.media-filter').addClass('selected');
		


	// 	// SHOW ALL
	// });


/*------------------------------------------------------------------------------------------------------------- 
											~~~~ END FILTER VIBE ~~~~
 -------------------------------------------------------------------------------------------------------------*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
												~~~~ GENERAL ~~~~
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


	$('#vibe-all').on('click', function(){
		var nthis = $(this);
		nthis.toggleClass('selected');
		if (nthis.hasClass('selected')) {
			nthis.removeClass('selected');
			$('.vibe-to').removeClass('selected');
		}
		else {
			nthis.addClass('selected');
			$('.vibe-to').addClass('selected');
		}
	});

	$('#vibe-modal').on('click', function(e){
		e.preventDefault();
		console.log('Modal');
	});

	// Creating a new Vibe post

	$('#new-post').on('keyup', function() {
		var message = $('#new-post').val();
		if (message.length > 0) {
			$('#character-count').text(message.length + ' Characters');
		} else {
			$('#character-count').text('');
		}
	});


	$('#feed').on('click', '.post-head', function() {
		$(this).siblings('.post-subcontent').slideToggle(500);
		console.log('Toggle nthis', $(this));
	});


}); // --> END JQUERY
