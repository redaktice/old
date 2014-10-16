var fs = require('fs');

var conversion = function () {


	var fileString = process.argv[2];

console.log(fileString);

	fs.readFile(fileString, "utf-8", function(err, data) {

console.log(data);

		var csvLineArray = data.split('\n');

		var keysArray = csvLineArray.shift().split(',');

		var valuesArray = csvLineArray.split('');

console.log(csvLineArray);

		var name = keysArray[0];
		var age = keysArray[1];
		var city = keysArray[2];

console.log(keysArray);

	});
};
conversion();