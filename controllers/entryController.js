var allEntries = [];
var Submission = require('../models/submission.js');
var contest = require('../models/contest.js');

var entryController = {
	newSubmission: function(req, res) {
					var name = req.body.name;
					var url = req.body.url;
					var title = req.body.title;
					var description = req.body.description;

					if (contest.entryCount < 8) {

						var newEntry = new Submission(name, url, title, description, 0, contest.entryCount);

						allEntries.push(newEntry);

						contest.entryCount ++;

						res.redirect('/');
					}

					else {
						res.send("We are sorry, the contest is full");
					}
				},
	allEntries: function(req, res) {
					res.render('submissions', {
						allEntries: allEntries
					});
				},
	addVote: function(req, res) {
				
				var submissionNumber = req.params.entryNumber;

				for (var i=0; i<allEntries.length; i++) {

// console.log(submissionNumber);
					if (allEntries[i].entryNumber == submissionNumber) {
// console.log(allEntries[i].entryNumber);
						allEntries[i].score ++;
					}
				}

				res.redirect('/currentEntries');

			}
};


module.exports = entryController;