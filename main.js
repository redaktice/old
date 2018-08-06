
// Gather information about the victims
var totalVictims = (prompt("How many victims are there?"));

var victimNameArray = [];
var victimPhoneArray = [];
var victimAddressArray = [];


for (var i=0; i<(totalVictims); i++) {

	var victimName = prompt("What was the victim's name?");
	victimNameArray.push(victimName);

	var victimPhone = prompt("What was the victim's phone number?");
	victimPhoneArray.push(victimPhone);

	var victimAddress = prompt("What was the victim's address?");
	victimAddressArray.push(victimAddress);
}



// Gather information from the volunteers
var totalVolunteers = prompt("How many volunteers are there?");

var volunteerNameArray = [];
var volunteerPhoneArray = [];
var volunteerAddressArray = [];



for (var i=0; i<(totalVolunteers); i++) {
		
	var volunteerName = prompt("What was the volunteer's name?");
	volunteerNameArray.push(volunteerName);

	var volunteerPhone = prompt("What was the volunteer's phone number?");
	volunteerPhoneArray.push(volunteerPhone);

	var volunteerAddress = prompt("What was the volunteer's address?");
	volunteerAddressArray.push(volunteerAddress);
}



// Create a variable to hold multiple values to use in alert message
var alertMessage = "Number of victims: " + totalVictims + "\nNumber of volunteers: " + totalVolunteers + "\n\nVictim names:\n"


// Concatenate the victims's names to the alert message
for (var i=0; i<totalVictims; i++) {

	alertMessage += victimNameArray[i] +"\n";
}



// Add an identifier for the volunteer names
alertMessage += "\nVolunteer names:\n";



// Concatenate the volunteers's names to the alert message
for (var i=0; i<totalVolunteers; i++) {

	alertMessage += volunteerNameArray[i] +"\n";
}


// Give alert message
alert(alertMessage);