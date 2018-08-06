var request = require('request');

/**
 * Get RGB values for a color
 * @return {String} RGB color values
 */
var webColorsAPI = function() {


	var userColor = process.argv[2];

	var componentColors;
	request('https://cdn.rawgit.com/metaraine/swatch/74580660c9229541622bbf1fd4198618d9f677e5/webcolors.json', function(err, res, body) {

		var allColors =  JSON.parse(body);

		allColors.map(function(obj) {
			if (obj.name.toLowerCase() === userColor.toLowerCase()) {
				var colors = [obj.rgb.r, obj.rgb.g, obj.rgb.b];
				componentColors = colors.join(' ');
				console.log(componentColors);
			}
		});
	});
};

webColorsAPI();

