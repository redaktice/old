// Part II: require


var luminosity = function() {
	var r = process.argv[2] * 0.2126;
	var g = process.argv[3] * 0.7152;
	var b = process.argv[4] * 0.0722;
	var colorLuminosity= r + g + b;
	return colorLuminosity;
};



// Bonus I
var darken = function() {
	var r = process.argv[2] * 0.8;
	var g = process.argv[3] * 0.8;
	var b = process.argv[4] * 0.8;
	var colorDarkend = [r,g,b];
	return colorDarkend.join(' ');
};




module.exports = {
	luminosity: luminosity,
	colorDarkend: darken
};