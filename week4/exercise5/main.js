// PROBLEM 1: PALINDROME

/**
// Function determines if a string is a palindrome
// Param (String)	The string to be checked
//Return (Boolean) True if palindrome
**/
var palindrome = function (string) {

	var wordArray = string.toLowerCase().split(' ');

	var stringArray =[];
	for (var i = 0; i<wordArray.length; i++) {
		console.log(wordArray[i].split(''));
		stringArray = stringArray.concat(wordArray[i].split(''));
	};
console.log(stringArray);

	for (var i = 0; i < stringArray.length; i++) {
		if (stringArray[i] !== stringArray[stringArray.length - 1 - i]) {
			return false;
		}
	};

	return true;
};


console.log("Palindrome: ", palindrome('racecar'));






// PROBLEM 2: DASH-INSERT

/**
// Function inserts dashes between adjacent odd numbers
// Param (Number)	The number to be dashed
//Return (Number) the number with dashes
**/
var dashInsert = function (numbers) {

	var splitNumbers = numbers.toString().split('');
console.log("Split", splitNumbers);

	var dashedNumberArray = [];

	for (var i = 0; i<splitNumbers.length; i++) {
		if ((splitNumbers[i] % 2 !== 0) && (splitNumbers[i+1] % 2 !== 0)) {
			if (i<splitNumbers.length-1) {
				dashedNumberArray.push(splitNumbers[i] + '-');
console.log("ODD");
			}
			else {
			dashedNumberArray.push(splitNumbers[i]);
			}
		}
		else {
			dashedNumberArray.push(splitNumbers[i]);
		}
	}
		
	return dashedNumberArray.join('');
	};


console.log("dashInsert: ", dashInsert(4547393));