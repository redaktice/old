// Part II: require


var luminosity = function() {
	var r = process.argv[2] * 0.2126;
	var g = process.argv[3] * 0.7152;
	var b = process.argv[4] * 0.0722;
	var colorLuminosity= r + g + b;
	return colorLuminosity;
};

module.exports = {
	luminosity: luminosity
};