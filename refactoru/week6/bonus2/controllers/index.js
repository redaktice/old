
var contest = require('../models/contest.js');

var indexController = {
	index: function(req, res) {
			for (var i = 0; i < contest.allEntries.length; i ++) {
					contest.allEntries[i].isWinner = null;
				}
			for (var k=0; k<contest.allEntries.length; k++) {
				if (contest.allEntries[k].isWinner === "lose") {
					contest.allEntries.splice(k, 1);
				}
			}
			res.render('index');
			},
	entry: function(req, res) {
			res.render('entry');
			},
	winner: function(req, res) {
				res.render('winner', {
					allEntries: contest.allEntries
				});
			},
	reset: function(req, res) {
			contest.allEntries = [];
			res.redirect('/');
	}
};

module.exports = indexController;