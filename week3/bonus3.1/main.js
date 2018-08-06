$(document).on('ready', function() {
  
var dayCount = 5;

var yearArray = [];
var year = 2014;


// CREATE DAY OBJECT
	var createDays = function () {

			var dayArray = [];

			for (var j=0; j<7; j++) {

				var thisDay = "";

				switch(j) {

					case 0:
						thisDay = "Sunday"
						dayClass = 'sun'
						break;

					case 1:
						thisDay = "Monday"
						dayClass = 'mon'
						break;

					case 2:
						thisDay = "Tuesday"
						dayClass = 'tues'
						break;

					case 3:
						thisDay = "Wednesday"
						dayClass = 'wed'
						break;

					case 4:
						thisDay = "Thursday"
						dayClass = 'thurs'
						break;

					case 5:
						thisDay = "Friday"
						dayClass = 'fri'
						break;

					case 6:
						thisDay = "Saturday"
						dayClass = 'sat'
						break;
				}

				var dayObject = {
					dayName: thisDay,
					dayClassName: dayClass
				}

			dayArray.push(dayObject);
			}

	

			return dayArray;
	};



// CREATE MONTH OBJECTS
		var createMonths = function (leap) {
			var monthArray = [];

			for (var i=0; i<12; i++) {

				var thisMonth = "";
				var monthLength = 0;

				switch(i) {
					case 0: 
						thisMonth = 'January'
						monthClass = 'jan'
						monthLength = 31
						break;

					case 1: 
						thisMonth = 'February'
						monthClass = 'feb'
						if (leap) {
							monthLength = 29
						}
						else {
							monthLength = 28
						}

						break;

					case 2: 
						thisMonth = 'March'
						monthClass = 'mar'
						monthLength = 31
						break;

					case 3: 
						thisMonth = 'April'
						monthClass = 'apr'
						monthLength = 30
						break;

					case 4: 
						thisMonth = 'May'
						monthClass = 'may'
						monthLength = 31
						break;

					case 5: 
						thisMonth = 'June'
						monthClass = 'jun'
						monthLength = 30
						break;

					case 6: 
						thisMonth = 'July'
						monthClass = 'jul'
						monthLength = 31
						break;

					case 7: 
						thisMonth = 'August'
						monthClass = 'aug'
						monthLength = 31
						break;

					case 8: 
						thisMonth = 'September'
						monthClass = 'sept'
						monthLength = 30
						break;

					case 9: 
						thisMonth = 'October'
						monthClass = 'oct'
						monthLength = 31
						break;

					case 10: 
						thisMonth = 'November'
						monthClass = 'nov'
						monthLength = 30
						break;

					case 11: 
						thisMonth = 'December'
						monthClass = 'dec'
						monthLength = 31
					break;
				}

			
				// Month object
				var monthObj = {

					'name': thisMonth,
					'monthClass': monthClass,
					'monthLength': monthLength,
				}
					
			monthArray.push(monthObj);
			}

			return monthArray;

		};




var nextDay = function () {

	return dayArray[dayCount % 7];
}


// CREATE YEAR OBJECT
	var createYear = function () {

		var isLeap = false;

		var thisYear = year;

		if (thisYear % 4 === 0) {
			isLeap = true;
		}
		else {
			isLeap === false;
		}

		var yearObj = {
			'year': thisYear,
			'leap': isLeap,
			// 'months': createMonths(isLeap)
		}

		yearArray.push(yearObj);



		// Increase the year by 1
		year++;
	}




/*--------------------------------------------------
IMMEDIATE CREATION
--------------------------------------------------*/

// Create a single YEAR object
// This also creates the MONTH objects
createYear();

// Create the array of DAY objects
createDays();




/*--------------------------------------------------
DOME ELEMENT CREATION
--------------------------------------------------*/

/*--------------YEAR--------------*/

// Create and HTML container for a year
var makeYearElement = function(year) {

	var yearElement = $('<div class="year"><h2>' + year.year + '<h2><ul class="year-list undecorated"></ul></div>');
	return yearElement;
	console.log(year.year);
};

/*--------------MONTH--------------*/

var makeMonthElement = function (month) {
	var monthElement = $('<li class="unstyled"><div class="month">' + month.thisMonth + '</div><ul class="month-list undecorated"></ul></li>');

	return monthElement;
};


/*--------------DAY--------------*/

var makeDayElement = function () {
	var dayElement = $('<li class="unstyled"><div class="day">' + nextDay() + '</div></li>');
	return dayElement;
};


/*--------------------------------------------------
ADDING TO THE DOM
--------------------------------------------------*/


 var calendar = $('.main-calendar');
 // var year = $('.year-list');
 var month = $('.month-list');
 var thisYear = yearArray[(yearArray.length-1)]);









//===========MAKE FIRST YEAR
	(function() {
		calendar.append(makeYearElement(thisYear);
	})();


//===========ADD MONTH
	var appendMonth = function (m) {
		$(this).parent('.year-list').append(makeMonthElement(thisYear[m]));
	};


//===========ADD DAY
var appendDay = function (m) {
	$(this).parent('.month-list').append(makeMonthElement(thisYear[m]));
};

});