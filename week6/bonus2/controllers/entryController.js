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

						contest.allEntries.push(newEntry);

						contest.entryCount ++;

						res.redirect('/');
					}
					else {
						res.send("We are sorry, the contest is full");
					}
				},
	allEntries: function(req, res) {
					res.render('submissions', {
						allEntries: contest.allEntries
					});
				},
	addVote: function(req, res) {
				for (var k=0; k<contest.allEntries.length; k++) {
					if (contest.allEntries[k].isWinner === "lose") {
						contest.allEntries.splice(k, 1);
					}
				}
				for (var i = 0; i < contest.allEntries.length; i ++) {
					contest.allEntries[i].isWinner = null;
				}
				var submissionNumber = req.params.entryNumber;

				for (var j=0; j<contest.allEntries.length; j++) {

// console.log(submissionNumber);
					if (contest.allEntries[j].entryNumber == submissionNumber) {
// console.log(allEntries[j].entryNumber);
						contest.allEntries[j].score ++;
					}
				}
				if (contest.allEntries.length > 1) {
					res.redirect('/currentEntries');
				}
				else {
					res.redirect('/winner');
				}
			},
	compete: function (req, res) {

	
			for (var k=0; k<contest.allEntries.length; k++) {
				contest.allEntries[k].isWinner = null;
			}

			for (var i = 0; i < contest.allEntries.length; i += 2) {
				if (contest.allEntries[i+1]) {

					if (contest.allEntries[i].score > contest.allEntries[i+1].score) {
						contest.allEntries[i].isWinner = "win";
						contest.allEntries[i+1].isWinner = "lose";

					}

					else if (contest.allEntries[i].score < contest.allEntries[i+1].score) {
						contest.allEntries[i+1].isWinner = "win";
						contest.allEntries[i].isWinner = "lose";

					}

					else {
						contest.allEntries[i].isWinner = contest.allEntries[i+1].isWinner = "win";
					}
				}
			}
			if (contest.allEntries.length > 1) {
				res.redirect('/currentEntries');
			}
			else {
				res.redirect('/winner');
			}
	}
};


module.exports = entryController;