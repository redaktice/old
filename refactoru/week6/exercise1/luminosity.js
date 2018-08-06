// Part I Luminosity Part 1
// Determine luminosity value


var luminosity = function() {
	var r = process.argv[2] * 0.2126;
	var g = process.argv[3] * 0.7152;
	var b = process.argv[4] * 0.0722;
	return r + g + b;
};

console.log(luminosity());