$(document).on('ready', function() {
  var handlebarsTemplate = $('#products-handlebars').html();
 var handlebarsTemplateFunc =  Handlebars.compile(handlebarsTemplate);

// console.log(productsData.productsList);
  for (var i = 0; i < productsData.productsList.length; i++) {
  	// console.log(handlebarsTemplateFunc(productsData.productsList[i]));
  	var newHTML = handlebarsTemplateFunc(productsData.productsList[i]);
  	$('#product-container').append(newHTML);
  }
});