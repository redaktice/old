var mongoose = require ('mongoose');

// Schema
var userSchema = mongoose.Schema({
	profile: {
		type: Object,
		required: true,
		unique: true
	},
	uniqueURL: {
		type: String,
		unique: true
	},
	vibeID: {
		type: Number,
		unique: true
	},
	// image: {
	// 	type: String,
	// 	required: true,
	// 	unique: false
	// },
	fbID: {
		type: String,
		required: true,
		unique: true
	},
	twID: {
		type: String,
		required: false,
		unique: false
	},
	// profile: {
	// 	type: Object,
	// 	required: true,
	// 	unique: true
	// },
	media: Object,
	posts: Array
});

// Model
var User = mongoose.model('user', userSchema);

module.exports = User;
