$(document).on('ready', function() {


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						CLASSES
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*----------------------Quotes---------------------*/ 


// QUOTE BASE CLASS
var Quote = function (author, quote, rank) {
	this.author = author.toLowerCase();
	this.quote = quote.toLowerCase();
	this.rank = rank;
};


/**
 * Generate DOM element for a quote
 * @return {string} DOM element to append to ul
 */
Quote.prototype.render = function() {

	this.element = $('#quote-template').clone();

	this.element.attr('id', ''); //.addClass('quote');

	this.element.find('.text').text(this.quote);
	this.element.find('.author').text('- ' + this.author);
	this.element.find('.rank').text(this.rank);


	// console.log(this.element);
	return this.element;
};




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						ARRAYS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var quoteArray = [];


// Get the author from the Quote object
var getAuthor = function (quote) {
	return quote.author;
};




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						QUOTATION IMPLEMENTATION
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++++++++ORGANIZE QUOTES BY AUTHOR+++++++++++++++++*/

	/**
	 * Renders unique authors and renders a list of their quotes
	 * @param  {string} authorName is an item in uniqueAuthorArray
	 * @return {DOM elements}            appends the author & quotes to the authored container in the footer
	 */
	var renderAuthor = function (authorName) {

		/**
		 * Search for quotes by an author
		 * @param  {object} quoteObject is each object contained in the quoteArray
		 * @return {object}             Array of quote objects with the author being searched
		 */
		var quotesByAuthor = quoteArray.filter(function(quoteObject) {
			return quoteObject.author === authorName;
		});

		console.log(quotesByAuthor);

	////////////////////////////////////////
	/////////  CREATE DOM ELEMENT  /////////
	////////////////////////////////////////
		var listedAuthor = $('#authored-template').clone();

		var authorsQuoteList = listedAuthor.find('.authored-quotes');

		listedAuthor.attr('id', '');
		// Assign the author name to the new DOM element
		listedAuthor.find('.author').text(authorName);

		// Append each quote by the author to the DOM element
		quotesByAuthor.map(function (quotation) {
			var listItem = $('<li>');
			authorsQuoteList.append(listItem);
			listItem.append(quotation.quote);
		});

	////////////////////////////////////////
	/////////  APPEND DOM ELEMENT  /////////
	////////////////////////////////////////
		$('.authored').append(listedAuthor);
	};
	
/**
 * Toggle whether or not the quotes per author ar shown
 * @return {string} Toggles hidden class on the author's quotes
 */
$('footer').on('click', '.show-quotes', function () {
	var thisButton = $(this);

	var quotesHidden = (thisButton.text() === 'Show Quotes');

	thisButton.siblings('ul').toggleClass('hidden');

	// Toggle what the button says using a ternary
	thisButton.text((quotesHidden) ? 'Hide Quotes': 'Show Quotes');
/*
	(RENDER THE QUOTES FROM THE ARRAY authoredQuotes)

	*/
});




/*----------------------Create a new Quote---------------------*/ 

var addButton = $('.add button');

var quoteForm = $('#quote-form');
 // GENERATE A FORM FOR QUOTE SUBMISSION
 
// Search for the new input area with the name attribute of 'Author'
var authorField = quoteForm.find('input[name=Author]');

// Search for the new textarea with the name attribute of 'Quote'
var quoteField = quoteForm.find('textarea[name=Quote]');


/**
 * Show the new quote form and hide the add button
 * @return {none} none
 */
addButton.on('click', function () {

	quoteForm.toggle();
	$(this).toggle();
});


/*----------------------Submit the new Quote---------------------*/ 

/**
 * Submits new Quote instance to the DOM
 * @param  {event} e used to prevent browser default
 * @return {string}   DOM elements added
 */
$('body').on ('submit', 'form', function(e) {
	e.preventDefault();

	// Grab the values from the entered text field
	var newAuthor = authorField.val();
	var newQuoteText = quoteField.val();

	// Create an instance of the quote class and pass in the form field values
	var newQuote = new Quote (newAuthor, newQuoteText, 0);



	// Add Quote instance to the array of quotes
	quoteArray.push(newQuote);


	var authorArray = quoteArray.map(getAuthor);
	var uniqueAuthorArray = _.uniq(authorArray);

	// Clears out the .authored ul
	$('.authored').empty();



// Render the element to place in the Quotes by Author section for each Unique Author
	/**
	 * [i Unique Author index of uniqueAuthorArray]
	 * @type {string}
	 */
	for (var i = 0; i < uniqueAuthorArray.length; i++) {
		renderAuthor(uniqueAuthorArray[i]);
									console.log(uniqueAuthorArray[i]);
	}

															console.log('Author Array', authorArray);
															console.log('Unique Author Array', uniqueAuthorArray);



	// Add Quote instance to the ranked order of the quotes
	$('.main-body .unstyled').append(newQuote.render());


	// Reset the form and add button
	authorField.val('');
	quoteField.val('');
	quoteForm.toggle();
	addButton.toggle();
});




//////////////////////////////////////////////////////////////////
/*+-+-+-+-+-+-+-+-+-+-+-+-+End of jQuery+-+-+-+-+-+-+-+-+-+-+-+-+*/
}); 


