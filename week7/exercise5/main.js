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

/**
 * Find number of vowels in a string
 * @param  {String} str String to find vowels in
 * @return {Number}     Number of vowels in str
 */
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




// Bonus Problem: Coin Determiner

/**
 * Finds least number of coins needed to achieve a number
 * @param  {Number} num Target total number from 1 to 250
 * @return {Number}     Fewest number of coins needed to add to num
 */
var coinDeterminer = function(num) {

	var coinVals = [11, 9, 7, 5, 1];
	var targetVal = num;
	var targetVal2 = num;
	var coinCount = 0;
	var coinCount2 = 0;

	var coinsUsed = [];
	var coinsUsed2 = [];


	coinVals.map(function(coin) {
			coinVals.map(function(coin) {

			if (targetVal > 0 && targetVal % coin === 0) {

														console.log("HI", coin);

				var mulitple = targetVal / coin;
				coinCount += mulitple;
				coinsUsed.push(coin);
				targetVal = 0;

		}
	});

		// if (targetVal2 % coin === 0) {

		// 												console.log("small hi", coin);

		// 		var mulitple2 = targetVal2 / coin;
		// 		coinCount2 += mulitple2;
		// 		coinsUsed2.push(coin);
		// 		targetVal2 = 0;

		// }
	});

	// Check 
	coinVals.map(function(coin) {

		if (targetVal2 > 0) {
			if (targetVal2 % coin === targetVal2) {
				return;
			}
			else if (targetVal2 % coin === 0) {

															console.log("small hi", coin);

					var mulitple = targetVal2 / coin;
					coinCount2 += mulitple;
					coinsUsed2.push(coin);
					targetVal2 = 0;

			}
			else {
				coinCount2 ++;
				targetVal2 -= coin;
															console.log("coin used 2: ", coin);
															console.log("target Value 2: ", targetVal2);
				coinsUsed2.push(coin);
			}
		}
	});



	coinVals.map(function(coin) {
													console.log("TARGET Value: ", targetVal);

		 while (coin <= targetVal) {
			coinCount ++;
			coinsUsed.push(coin);
													 console.log("COIN used: ", coin);
													 console.log("TARGET Value: ", targetVal);
		 	targetVal -= coin;
		 }
	});





// Check which coin arrangement is the shortest
	if (coinCount <= coinCount2) {
													console.log("Coins used Array: ", coinsUsed);
		return coinCount;
	}
	else {
													console.log("Coins used Array 2: ", coinsUsed2);
		return coinCount2;
	}
};



// Execute the function
console.log("Least coins: ", coinDeterminer(25));