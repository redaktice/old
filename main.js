$(document).on('ready', function() {
  



  // PART 1;
  // Adding click listener to editable text
  
  $(".editable").on ("click", function () {
  		$(this).html("&nbsp;");
  		$(this).append("<textarea placeholder='"+ "'$(this).text()'"+"'></textarea>");
  });

});