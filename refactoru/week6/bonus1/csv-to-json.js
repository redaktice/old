var fs = require('fs');

/**
 * Convert CSV to JSON string
 * @return {JSON string} Array of stringified objects
 */
var conversion = function () {

	var fileString = process.argv[2];

// console.log(fileString);

	fs.readFile(fileString, "utf-8", function(err, data) {
// console.log(data);
		var csvLineArray = data.split('\n');
		var keysArray = csvLineArray.shift().split(',');
// console.log("Output")
// console.log(keysArray);
		var output = csvLineArray.map(function(person) {
			var valuesArray = person.split(',');
			var tempObject = {};
			for (var i = 0; i < keysArray.length; i++) {
				tempObject[keysArray[i]] = valuesArray[i];
			}
			return tempObject;
		});


		fs.writeFile(process.argv[3], JSON.stringify(output), "utf-8", function() {			
			console.log(JSON.stringify(output));
		});
	});
};

// Execute the function
conversion();


