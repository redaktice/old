// PROBLEM 1

// Finds an object key "name" value
var getName = function (someObj) {
	return someObj.name;
};

getName({name: 'Burt', age: 30});





// PROBLEM 2

// Combines array elements and only reports letters
var totalLetters = function (someArr) {
	return someArr.join("").length;
};

totalLetters(['what', 'happened', 'to', 'my', 'function']);






// PROBLEM 3

// Create an object with a key and value
var keyValue = function (keyName, value) {

	var newObject = {};

	newObject[keyName] = value;

	return newObject;
};

keyValue ('city', 'denver');






// PROBLEM 4

// Calls the array index using negative index numbers
var negativeIndex = function (newArray, negativeNum) {

	return newArray[newArray.length+negativeNum];
};

negativeIndex (['a', 'b', 'c', 'd', 'e'], -2);






// PROBLEM 5

// removes all 'm' characters from a string

var deleteM = function (letter) {

	if (letter === "m" || letter === "M") {
		return false;
	}

	else {
		return true;
	}
}


var removeM = function (string) {

	return string.split("").filter(deleteM).join("");

	// var letterArray = string.split('');

	// var newArray = letterArray.filter(deleteM);
	// return newArray.join('');
};



	var phrase = "memory";

	removeM(phrase);

	console.log(removeM(phrase));










// PROBLEM 6

// Print objec key: value pair
var printObject = function (object) {

	for (var key in object) {
		console.log(key + " is " + object[key]);
	}
};

printObject({a: 10, b: 20, c: 30, d: 40});











// PROBLEM 7


//FROM SOLUTIONS


// Returns an array of vowels in a string
var vowels = function (newString) {


	var stringArray = newString.split("");

	var onlyVowel = "";

	// Create an object listing all of the vowels
	var vowelList = {
		a: "a",
		e: "e",
		i: "i",
		o: "o",
		u: "u"
	};

	// Check each letter in the passed - in  string
	for (var i=0; i<stringArray.length; i++) {

	// Check if the array element is in the vowelList
			for (var x in vowelList) {
				
				if (stringArray[i] === x) {
					onlyVowel += stringArray[i];
				}
			}
	}

	return onlyVowel;
};

	vowels("concussion");







// PROBLEM 8

// Check if array pair is the same
var twins = function (nArray) {

	for (var i = 0; i<nArray.length; i+= 2);

		if (nArray[i] === nArray[i+1]) {
			return true;
		}

		return false;
};

twins(['a', 'd', 'b', 'b', 'c', 'c'])





