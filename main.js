$(document).on('ready', function() {

/*----------------------Create a new Quote---------------------*/ 
  
	var addButton = $('.add button');

	addButton.on('click', function () {

		var newAuthor = $('<input type="text" name="Author" placeholder="Author Name">');
		var newQuote = $('<textarea rows="5" cols="30" name="Quote" placeholder="Enter Quote Here"></textarea>');
		var submitButton = $('<input type="submit" value="Add Quote">');
		var newQuoteForm = $('<form></form>');

		newQuoteForm.append(newAuthor);
		newQuoteForm.append(newQuote);
		newQuoteForm.append(submitButton);

		var mthis = $(this);
		mthis.before(newQuoteForm);
		mthis.hide();
	});


/*Submit New Quote*/

	$('body').on ('submit', 'form', function(e) {
		e.preventDefault();

		if ($('.main-body').find($('<ul>')).length === 0) {
			$('.main-body').append($('<ul class="unstyled"></ul>'));
		}
	});

}); // End of jQuery