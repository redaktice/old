// Problem 1: Alphabet Soup

/**
 * Alphabetically organize letters in a string
 * @param  {String} str Word to organize
 * @return {String}     Alphabetically organized word
 */
var alphabetSoup = function (str) {
	var lettersArray = str.toLowerCase().split('');
	lettersArray.sort();
// console.log(lettersArray.sort());
	return lettersArray.join('');
};

console.log("Alphabetically organized: ", alphabetSoup("Hello"));



// Problem 2: Vowel Count:
var vowelCount = function (str) {

	var vowels = ['a', 'e', 'i', 'o', 'u'];

	var allLetters = str.toLowerCase().split('');

	var numVowels = 0;

	allLetters.map(function (letter) {
		if (vowels.indexOf(letter) > -1) {
// console.log("Letter: ", letter);
			numVowels ++;
		}
	});

	return numVowels;
};

console.log("Total number of vowels: ", vowelCount("All cows eat grass"));