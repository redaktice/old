// PROBLEM 1
// Reverses the order of the string
var firstReverse = function (someString) {
	var stringArray = someString.split('');
	var inverted = [];
	for (var i = stringArray.length-1; i>=0; i--) {
		inverted.push(stringArray[i]);
	}

	return inverted.join("");
};

console.log(firstReverse("Hello this is a string"));



// PROBLEM 2
// Swap the case of each letter
var swapCase = function (anotherString) {
	var newStringArray = anotherString.split('');
	var caseSwitched = [];
	for (var i = 0; i<newStringArray.length; i++) {
		if (newStringArray[i] === newStringArray[i].toLowerCase()) {
		caseSwitched.push(newStringArray[i].toUpperCase());
		}
		else {
			caseSwitched.push(newStringArray[i].toLowerCase());
		}
	}

	return caseSwitched.join("");
};

console.log(swapCase("Hello This Is A String"));








// BONUS I
// Returns the word with the most repeated letters in a string
var letterCount = function (bonusString) {
	var wordArray = bonusString.split(' ');

console.log(wordArray);

	var repeatCount = [];

	// Create an object to store unique letters per word
	for (var i = 0; i< wordArray.length; i++) {
		var wordObject = {};
		repeatCount[i] = 0;



		// Add unique letters per word to wordObject
		for (var j = 0; j < wordArray[i].length; j++) {
			if (!(wordArray[i][j] in wordObject)) {
				wordObject[wordArray[i][j]] = wordArray[i][j];


			}

			// Increment repeatCount if a letter is already in wordObject
			else {
				for (var x in wordObject) {
					if (wordObject[x] === wordArray[i][j]) {
						repeatCount[i]++;
					}
				}
			}
		}
	}

	// Grab the index of the largest number
	var maxRepeats = repeatCount.indexOf(Math.max.apply(null, repeatCount));

	// Return -1 if there are no repeated letters in a word
	if (maxRepeats < 1) {
		return -1;
	}

	// Find the word of the same array index as that of the biggest number
	var repeatWinner = wordArray[maxRepeats];
	return repeatWinner;
};

console.log(letterCount('Today, is the greatest day ever!'));