$(document).on('ready', function() {
  



  // PART 1 & 2
  // Adding click listener to editable text
  
  	$(".editable").hover (function() {
			$(this).css("backgroundColor", "#EEC");
		}, function () {
	  		$(this).css("backgroundColor", "");
	  });


  $(".editable").on ("click", function () {

  		// Reduce jQuery strain
  		var thisClicked = $(this);
  		var defaultText = thisClicked.text();
  		var userEntered = $("<textarea class='textArea' placeholder='" + defaultText +"'></textarea>");

  		// Give dimensions to text area
  		userEntered.width(thisClicked.outerWidth());
  		userEntered.height(thisClicked.height());

  	
		
		thisClicked.hide();

  		thisClicked.after(userEntered);


		userEntered.focus();
  });

	// Reassign the user input to the element
	  $("body").on ("blur", ".textArea", function () {
		
	  		// Reduce jQuery strain
	  		var textArea = $(this);
	  		var thisClicked = textArea.prev();
	  		var userText = textArea.val();

	  		// Don't do anything if user didn't write anything
			if (userText === "") {
					return
		 	 }

		 	 // Hide textArea
	  		textArea.hide();
	  		
	  		thisClicked.text(userText);
	  		thisClicked.show();
	  });
});