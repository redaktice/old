$(document).on('ready', function() {
 
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
var freqAM = $("<ul class='horizontal-list unstyled label'></ul>");
var freqFM = $("<ul class='horizontal-list unstyled label'></ul>");

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
					EXTERNAL LABELS
================================================
 */

var externalLabels = $("<div class='empty-box'></div>");
var timeLabel = $("<div class='label'>AM/PM</div>")
var autoLabel = $("<div class='label'>Auto</div>")



externalLabels.append(timeLabel);
externalLabels.append(autoLabel);






/* ================================================
					CLOCK FACE
================================================
 */

var display = $("<div class='solid-box screen'></div>");
var indicator = $("<h1 class = 'clock-display indicator unspaced'>.</h1>")
var time = $("<h1 class = 'clock-display unspaced'>12:17</h1>")


display.append(indicator);
display.append(time);



/* ================================================
					OVERALL
================================================
 */

// Build Inside-Out

innerShell.append(externalLabels);
innerShell.append(display);
innerShell.append(freqBox);

freqBox.append(freqAM);
freqBox.append(freqFM);

outerShell.append(innerShell);

$('.container').append(outerShell);

});