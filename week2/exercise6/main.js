
// QUESTION 1
// Print out input multiple times
var tripleFive = function() {
	for (var i=0; i<3; i++) {
		console.log("Five!");
	}
}

console.log("Q1: Print out 'input' multiple times: ");
tripleFive();



// QUESTION 2
// Finds last letter of input
var lastLetter = function(word) {
	return (word.charAt(word.length - 1));
}

console.log("Q2: Last letter of input: " + lastLetter('hello'));



// QUESTION 3
// Finds square of input
var square = function (x) {
	return (x*x);
}

console.log("Q3: Square of input: " + square (7));



// QUESTION 4
// Gets negative of input value
var negate = function (x) {
	return (-x);
}


console.log("Q4: Multiply by -1: " + negate (10));




// QUESTION 5
// Create an array of numbers
var toArray = function (num1, num2, num3) {
	var numberArray = [num1, num2, num3];
	return (numberArray);
}


console.log("Q5: Create an array of numbers: " + toArray(9, 8, 7));





// QUESTION 6
// Check if the string starts with "A"
var startsWithA = function (word) {
	return (word.charAt(0).toLowerCase() === "a");
}


console.log("Q6: Does the word start with an 'A': " + startsWithA("armadillo"));





// QUESTION 7
// Add "!!!"
var excite = function (string) {
	return (string + "!!!");
}


console.log("Q7: Add Exclamation: " + excite("Whoo"));




// QUESTION 8
// Look for word "sun"
var sun = function (string) {

// Convert input to lowercase for checking
var lowerCaseString = string.toLowerCase();

	// Cylce through string and look for target string
	for (var i=0; i<string.length; i++) {
		var letterS = lowerCaseString[i] === "s";
		var letterU = lowerCaseString[i+1] === "u";
		var letterN = lowerCaseString[i+2] === "n";
		if (letterS && letterU && letterN) {
			return true;
		}
	}
	return false;
}

console.log("Q8: Sun Function gives " + sun("TotalSunBeam"));



// QUESTION 9
var tiny = function (num) {
	return (num <= 1);
}

console.log("Q9: Is the number 1 or smaller?: " + tiny(.2));





// QUESTION 10
var getSeconds = function (time) {
	var minutesToSeconds = +time.substring(0,2) * 60;
	var seconds = +time.substring(3,5);

	return (minutesToSeconds + seconds);
}


console.log("Q10: Time in seconds: " + getSeconds("01:28"));