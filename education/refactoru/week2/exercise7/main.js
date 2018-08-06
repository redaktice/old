$(document).on('ready', function() {
  
// PART 1: Click Button
  // Append text
  $(".add-text").on ("click", function () {
  	console.log("Here is some text");
  	$("body").append("<h1>more text</h1>");
  });


  // Append list
  $(".add-list").on ("click", function () {

  	// Create a series of list items
  	var list = "";
  	for (var i=0; i<3; i++) {
  		list += "<li>List-" + (i+ 1) + "</li>"
  	}

  	// Append the list to the body
  	$("body").append("<ul>" + list + "</ul>");
  });





// PART 2: Paragraph Highlighter

	// Mouse over paragraph
	$("p").on ("mouseover", function () {

		//Turn paragraph pink
		$(this).css({
			color: "#F0A"
		});
		
		// Add an exclamation to each heading
		$("h1, h4").append("!");
	});

	// Click on links
	$("a").on ("click", function () {
		var linkConfirmation = confirm("Are you sure you want to go to this link?");
		if (linkConfirmation === false) {
			$(this).remove();
			return false;
		}
	});

	 

// PART 3: Large Button

	$(".large-button").on("click", function() {

		// Create a new element in the DOM
		var newJQvar = $("<div>This is a popUp</div>");

		// Give the new elemnt different property values
		newJQvar.css ({
			textAlign: "center",
			height: "100px",
			width: "100%",
			marginTop: "2em"
		}).addClass("popUp");


		// Add new element to the body
		$("body").append(newJQvar);

		// Add a popUp to the
		$(".popUp").append("<br><button>Close PopUp</button>");

		// Close the popUp when clicking on the button
		$(".popUp button").on ("click", function() {
			newJQvar.remove();
		});
	});
});