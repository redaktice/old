$(document).on('ready', function(e) {


/* ================================================
					SHELL
================================================
 */
var outerShell = $("<div class='outer-shell'></div>");
var innerShell = $("<div class='inner-shell'></div>");




/* ================================================
					FREQUENCIES
================================================
 */

var freqBox = $("<div class='empty-box frequencies'></div>");
var freqAM = $("<ul class='unstyled label'></ul>");
var freqFM = $("<ul class='unstyled label'></ul>");

// Declare arrays to store frequencies
var freqAMList = ["AM", 53, 60, 70, 110, 140, 170];
var freqFMList = ["FM", 89, 92, 96, 102, 106, 108];


// Generate the list items
var listGenerator = function(list) {
	var createdList = "";

	for (var i=0; i<list.length; i++) {
		createdList += "<li>" + list[i] + "</li>";
	}

	return createdList;
};



var frequenciesAM = listGenerator(freqAMList);
var frequenciesFM = listGenerator(freqFMList);


freqAM.append(frequenciesAM);
freqFM.append(frequenciesFM);


/* ================================================
					ALL VISUALS
================================================
 */

var visualContainer = $("<div class='visual-container'></div>")



/* ================================================
					EXTERNAL LABELS
================================================
 */

var externalLabels = $("<div class='label-box'></div>");
var timeLabel = $("<div class='external label'>AM/PM</div>")
var autoLabel = $("<div class='external label'>Auto</div>")



externalLabels.append(timeLabel);
externalLabels.append(autoLabel);






/* ================================================
					CLOCK FACE
================================================
 */



var display = $("<div class='screen'></div>");
var indicator = $("<h1 class = 'clock-display indicator'>.</h1>");
var time = $("<h1 class = 'clock-display'></h1>");


display.append(indicator);
display.append(time);

// Creates a text value for the time
var getTime = function() {

	var date = new Date();

	// Ensure a two digit minute representation
		if (date.getMinutes() < 10) {

			var timeVar = date.getHours() + ":0" + date.getMinutes();
		}

		else {
			var timeVar = date.getHours() + ":" + date.getMinutes();
		};

	time.text(timeVar);

};

// Update time every second
setInterval(getTime, 1000);

// Call to get time without first 1 second delay
getTime();




/* ================================================
					OVERALL
================================================
 */

// Build Inside-Out
innerShell.append(visualContainer);

visualContainer.append(externalLabels);
visualContainer.append(display);
visualContainer.append(freqBox);

freqBox.append(freqAM);
freqBox.append(freqFM);

outerShell.append(innerShell);

$('.container').append(outerShell);

});