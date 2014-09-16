// QUESTION 1
// Capitalizes the first letter of each word in a string
var letterCapitalize = function (text) {

	// Splits input
	var splitText = text.split(" ");

	// Declare empty final string
	var capitalizedText = "";

	for (var i=0; i<splitText.length; i++) {
		var capitalizedLetter = splitText[i].charAt(0).toUpperCase();

		// Add remainder of word to capitalizedLetter for use in the output
		capitalizedText += capitalizedLetter + splitText[i].substring(1, splitText[i].length) + " ";
	}

	return capitalizedText;
};

console.log("Q1: Capitalize the first letter of each word: " + letterCapitalize("what are you doing?"));




// QUESTION 2
// Tells how many words are in the input string
var wordCount = function (text) {

	// Split the words
	var splitPhrase = text.split(" ");

	return splitPhrase.length;
};

console.log("Q2: Words in sentence: " + wordCount("How many words are in this?"));





// QUESTION 3
// Determine if a number is prime
var primeTime = function (number) {

	// Check if the input is 1
	if (number === 1) {
		return "1 is technically not a prime number";
	}

	// Check if the input is 2
	if (number === 2) {
		return "2 is a prime number";
	}

	// Check if the input is divisible by anything besides itself
	for (var i=2; i<(number); i++) {
		if ((number % i) === 0) {
			return "The number is not prime.";
		}
	}

	return "The number is prime.";
};

console.log("Q3: Check if a number is prime: " + primeTime(231));  