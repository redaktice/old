var itsANumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var userNumber = prompt("Please enter your phone number (Including the dashes). Your number will not be spammed");
alert(itsANumber(userNumber.charAt(0,1,2,4,5,6,8,9,10,11,12)) && userNumber.charAt(3) === "-" && userNumber.charAt(7) === "-");

var userBirthDate = prompt("Enter birth date using xx/xx/xx format");
alert(itsANumber(userBirthDate.charAt(0,1,3,4,6,7)) && userBirthDate.charAt(2) === "/" && userBirthDate.charAt(5) === "/");

var userPostCode = prompt("Enter postal code as xxxxx OR xxxxx-xxxx");
alert((itsANumber(userPostCode) && userPostCode.length === 5) || (itsANumber(userPostCode.charAt(0,1,2,3,4,6,7,8,9)) && userPostCode.length === 10 && userPostCode.charAt(5) === "-"));

var userState = prompt("Enter 2 letter state abbreviation");
alert(!itsANumber(userState) && userState.length === 2 && userState === userState.toUpperCase());

var userMarriage = prompt("Are you married? Yes/No");
alert(userMarriage.toUpperCase() === NO || userMarriage.toUpperCase() === YES);
