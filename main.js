$(document).on('ready', function() {
  
	// Store the jQuery versions of the profile info
	var profileName = $(".name");
	var profileBio = $(".bio");
	var profileBooks = $(".books");
	var profileJS = $(".js");

	var formButton = $(".show-form")

	var formShown = false;


	// Toggle whether or not the input form is shown
	formButton.on("click", function() {

		$(".user-info").slideToggle(1000);

		// Change the message on the button
		formButton.text(function() {

			if (!formShown) {
				formShown = true;
				return "Hide Form";
			}

			else {
				formShown = false;
				return "Show Form";
			}
		});
	});



	// Save input info in the appropriate profile locations
  $("form").on('submit', function(e) {
  	e.preventDefault();

	// Store jQuery versions of input info
  	var userName = $(".input-name").val();
	var userBio = $(".input-bio").val();
	var userBooks = $(".input-books").val();
	var userJS = $(".input-js").val();


	console.log("Name:", userName);
	console.log("Bio:", userBio);
	console.log("Books:");
	console.log("JS:");

  	var chosen = $(this);

  	// Assign input text to profile locations
  	profileName.text(userName);
  	profileBio.text(userBio);
  	profileBooks.text(userBooks);
  	profileJS.text(userJS);
  });


  // ---------------------------------BONUS-------------------------------


	// // Stop browser default
 //  $("form").on('submit', function(e) {
 //  	e.preventDefault();
 //  });


	// // Auto save the input
	
	// $("input").on("keyup", function() {
		
	// // Store jQuery versions of input info
 //  	var userName = $(".input-name").val();
	// var userBio = $(".input-bio").val();
	// var userBooks = $(".input-books").val();
	// var userJS = $(".input-js").val();


	// console.log("Name:", userName);
	// console.log("Bio:", userBio);
	// console.log("Books:");
	// console.log("JS:");

 //  	var chosen = $(this);

 //  	// Assign input text to profile locations
 //  	profileName.text(userName);
 //  	profileBio.text(userBio);
 //  	profileBooks.text(userBooks);
 //  	profileJS.text(userJS);
 //  });
});