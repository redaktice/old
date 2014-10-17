var Submission = function (name, url, title, description, score, entryNumber) {
		this.name = name;
		this.url = url;
		this.title = title;
		this.description = description;
		this.score = score || 0;
		this.isWinner = null;
		this.entryNumber = entryNumber || 0;
};

module.exports = Submission;


//  http://www.youtube.com/embed/fXjNnaSaTek
//  NizarZmTv A
//  PEOPLE ARE AWESOME 2014/2013

