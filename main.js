var itsANumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


// Input phone number
var userNumber = prompt("Please enter your phone number (Including the dashes). Your number will not be spammed");


var validPhone = itsANumber(userNumber.substring(0,2)) && itsANumber(userNumber.substring(4,6)) && itsANumber(userNumber.substring(8,11));
alert(validPhone && userNumber.charAt(3) === "-" && userNumber.charAt(7) === "-");


// Input birth date
var userBirthDate = prompt("Enter birth date using xx/xx/xx format");

var validDOB = itsANumber(userBirthDate.substring(0,1)) && itsANumber(userBirthDate.substring(3,4)) && itsANumber(userBirthDate.substring(6,7));
alert(validDOB && userBirthDate.charAt(2) === "/" && userBirthDate.charAt(5) === "/");


// Input birth date
var userPostCode = prompt("Enter postal code as xxxxx OR xxxxx-xxxx");

var validPostalShort = itsANumber(userPostCode.substring(0,4));

var validPostalLong = validPostalShort && itsANumber(userBirthDate.substring(6,9));

alert((validPostalShort && userPostCode.length === 5) || (validPostalLong && userPostCode.length === 10 && userPostCode.charAt(5) === "-"));



var userState = prompt("Enter 2 letter state abbreviation");
alert(!itsANumber(userState) && userState.length === 2 && userState === userState.toUpperCase());

var userMarriage = prompt("Are you married? Yes/No");
alert(userMarriage.toUpperCase() === "NO" || userMarriage.toUpperCase() === "YES");

