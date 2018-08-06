$(document).on('ready', function() {

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						ARRAYS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var quoteArray = [];


// Get the author from the Quote object
var getAuthor = function (quote) {
	return quote.author;
};




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
	this.element.find('.quote-container').attr('data-tag', this.dataTag);

	this.element.find('.text').text('"' + this.quote + '"');
	this.element.find('.author').text('- ' + this.author);
	this.element.find('.rank').attr('data-tag', this.dataTag);
	this.element.find('.delete').attr('data-tag', this.dataTag);

	for (var i = 1; i < 6; i++) {
		if (i <= this.rank) {
			this.element.find('.rank').append($('<span class="star">★</span>'));//quoteObject.rank);
		}
		else {
			this.element.find('.rank').append($('<span class="star">☆</span>'));//quoteObject.rank);

		}
	}
	// console.log(this.element);
	return this.element;
};






/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						QUOTATION IMPLEMENTATION
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++		RENDERING		+++++++++++++++++*/

/**
 * Places Quote DOM elements on the screen under the Rank section
 * @param  {Object} quoteObject Quote Objects in quoteArray
 * @return {DOM element}             Rendered DOM elements
 */
var renderQuote = function (quoteObject) {
	quoteObject.element = $('#quote-template').clone();

	quoteObject.dataTag = _.uniqueId();

	quoteObject.element.attr('id', ''); //.addClass('quote');

	quoteObject.element.find('.quote-container').attr('data-tag', quoteObject.dataTag);

	quoteObject.element.find('.text').text('"' + quoteObject.quote + '"');
	quoteObject.element.find('.author').text('- ' + quoteObject.author);
	quoteObject.element.find('.rank').attr('data-tag', quoteObject.dataTag);
	quoteObject.element.find('.delete').attr('data-tag', quoteObject.dataTag);


	for (var i = 1; i < 6; i++) {
		if (i <= quoteObject.rank) {
			quoteObject.element.find('.rank').append($('<span class="star">★</span>'));//quoteObject.rank);
		}
		else {
			quoteObject.element.find('.rank').append($('<span class="star">☆</span>'));//quoteObject.rank);

		}
	}

	// console.log(quoteObject.element);
	return quoteObject.element;
};



/*++++++++++++++++++++ORGANIZE QUOTES BY AUTHOR+++++++++++++++++*/
var updateAuthorArray = function () {
		var authorArray = quoteArray.map(getAuthor);
		var uniqueAuthorArray = _.uniq(authorArray);

		// Clears out the .authored ul
		$('.authored').empty();

		for (var m = 0; m < uniqueAuthorArray.length; m++) {
			renderAuthor(uniqueAuthorArray[m]);
		}

};


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

		

	////////////////////////////////////////
	/////////  CREATE DOM ELEMENT  /////////
	////////////////////////////////////////
		var listedAuthor = $('#authored-template').clone();

		var authorsQuoteList = listedAuthor.find('.authored-quotes');


		listedAuthor.attr('id', '');
		// listedAuthor.attr('data-tag', );

		// Assign the author name to the new DOM element
		listedAuthor.find('.author').text(authorName);
		// listedAuthor.attr('data-tag', quoteObject.dataTag);

		// Append each quote by the author to the DOM element
		quotesByAuthor.map(function (quotation) {
			var listItem = $('<li>');
			authorsQuoteList.append(listItem);
			listItem.append('<span class="bullet">●</span>' + ' "' + quotation.quote + '"');
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
});



/*++++++++++++++++++++ORGANIZE QUOTES BY RANK+++++++++++++++++*/

var rankThis = false;


/**
 * Highlight this star and the stars before it 
 * @return {[DOM element]} [Change the star]
 */
$('.main-body').on('mouseover', '.star', function() {
	if (rankThis) {
		$(this).text('★');
		$(this).closest('.rank').find('.star:lt(' + $(this).index() + ')').text('★');
	}
});


/**
 * Un-highlight this star and the stars before it 
 * @return {[DOM element]} [Change the star]
 */
$('.main-body').on('mouseout', '.star', function() {
	if (rankThis) {	
		$(this).text('☆');
		$(this).closest('.rank').find('.star:lt(' + $(this).index() + ')').text('☆');
	}
});



/**
 * Allow the user to rate the quote
 * @return {DOME element} Re-renders the quotes in the Rank section
 *  after assigning a rank and reorganizing the quoteArray
 */
$('.main-body').on('click', '.star', function () {

console.log("Star clicked");

	if (rankThis) {
		var thisInformation = $(this).closest('.rank').attr('data-tag');
		var associatedQuote;

		for (var i = 0; i < quoteArray.length; i++) {
			if (quoteArray[i].dataTag === thisInformation) {
				associatedQuote = quoteArray[i];
			}
		}

		associatedQuote.rank = $(this).index() + 1;

	


		$(this).closest('.rank').find('.star:lt(' + $(this).index() + ')').text();

	}

		rankThis = false;
});






/////////////////////////////////////////////////////////////////
/*----------------------Create a new Quote---------------------*/ 

var addButton = $('.add .add-quote');

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
	$('input[name=Author]').focus();
});


///////////////////////////////////////////////////////////////////
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
	if (newAuthor !== '' && newQuoteText !== '') {
		quoteArray.push(newQuote);
	}
	else {
		return;
	}

	updateAuthorArray();



	// Add Quote instance to the ranked order of the quotes
	$('.main-body .unstyled').empty();
	$('.main-body .unstyled').append(quoteArray.map(renderQuote));//newQuote.render());


	// Reset the form and add button
	authorField.val('');
	quoteField.val('');
	quoteForm.toggle();
	addButton.toggle();
});




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						RANDOM QUOTE
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var randomButton = $('.add .random');

/**
 * Pick a random quote and create a popup of the quote
 * @return {DOM elements} Popup Box with a random quote
 */
randomButton.on('click', function () {

	var random = Math.round(Math.random() * (quoteArray.length-1));
	var randomQuote = quoteArray[random];

	var popupQuote = $('#popup-template').clone();

	popupQuote.attr('id', 'new-popup');
	popupQuote.find('.popup').append(randomQuote.render());

	$('.grey').toggle();

	$('.grey').append(popupQuote);
});




/**
 * Exits the popup quote and returns to the main screen
 * @return {[type]} [description]
 */
$('body').on('click', '.close', function () {
	console.log("test");
	$(this).closest('.popup-container').remove();

	$('.grey').toggle();

});




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						DELETE OPTION
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

$('.main-body').on('click', '.options', function () {

	nthis = $(this);
	

	console.log("Options clicked");

	var deletedQuote;

	for (var i = 0; i < quoteArray.length; i++) {
		if (quoteArray[i].dataTag === nthis.siblings('.delete').attr('data-tag')) {
			deletedQuote = quoteArray[i];
		}
	}

	nthis.siblings('.delete').toggle();

	if (nthis.text() === 'Rank/Remove') {
		rankThis = !rankThis;
		nthis.text('Done');

		// // quoteArray.sort(function(a, b) {return b.rank-a.rank;});

		// $('.main-body .unstyled').empty();

		// $('.main-body .unstyled').append(quoteArray.map(renderQuote));
	}

	else {
		nthis.text('Rank/Remove');

		console.log("ELSE");

		if (nthis.siblings('.quote-container').css('display') === 'none') {
			nthis.closest('.rank-organized').remove();

			// delete quoteArray[quoteArray.indexOf(deletedQuote)];
			quoteArray.splice(quoteArray.indexOf(deletedQuote), 1);

			console.log(quoteArray);

			quoteArray.sort(function(a, b) {return b.rank-a.rank;});

				// Add Quote instance to the ranked order of the quotes
			$('.main-body .unstyled').empty();

			$('.main-body .unstyled').append(quoteArray.map(renderQuote));
			
			/**
			 * [i Unique Author index of uniqueAuthorArray]
			 * @type {string}
			 */
			
			 $('.authored').empty();

			 updateAuthorArray();


			// $('[data-tag =' + nthis.attr('data-tag') + ']').remove();

		}

		rankThis = false;


		quoteArray.sort(function(a, b) {return b.rank-a.rank;});

		// Add Quote instance to the ranked order of the quotes
		$('.main-body .unstyled').empty();

		$('.main-body .unstyled').append(quoteArray.map(renderQuote));

	}
});





$('.main-body').on('click', '.delete', function () {

var thisQuote;

	var nthis = $(this);
		for (var i = 0; i < quoteArray.length; i++) {
			if (quoteArray[i].dataTag === nthis.attr('data-tag')) {
				thisQuote = quoteArray[i];
			}
		}

	if (nthis.text() === 'Delete') {
		console.log(nthis);
	
		// $('.quote-container[data-tag="' + nthis.attr('data-tag') + '"]').toggle();
		console.log('All these tags', $('[data-tag =' + nthis.attr('data-tag') + ']'));

		thisQuote.element.find('.quote-container').toggle();
		nthis.text('Undo Delete');
	}

	else {
		nthis.text('Delete');
		thisQuote.element.find('.quote-container').toggle();
	}
});





//////////////////////////////////////////////////////////////////
/*+-+-+-+-+-+-+-+-+-+-+-+-+End of jQuery+-+-+-+-+-+-+-+-+-+-+-+-+*/
}); 


