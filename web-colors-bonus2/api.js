var request = require('request');


var webColorsAPI = function() {


	var userColor = process.argv[2];

	var componentColors;
	request('https://cdn.rawgit.com/metaraine/swatch/74580660c9229541622bbf1fd4198618d9f677e5/webcolors.json', function(err, res, body) {

		var allColors =  JSON.parse(body);

		// return allColors;
				
		allColors.map(function(obj) {
			for (var key in obj) {
				if (obj[key] === userColor) {
					var colors = [obj.rgb.r, obj.rgb.g, obj.rgb.b];
					componentColors = colors.join(' ');
				}
			}
		});
	});

	return componentColors;
};


// console.log (allColors);


webColorsAPI();
// console.log(webColorsAPI());

