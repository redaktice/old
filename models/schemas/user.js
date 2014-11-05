var mongoose = require ('mongoose');

// Schema
var userSchema = mongoose.Schema({
	fbID: {
		type: String,
		required: true,
		unique: true
	},
	profile: {
		type: Object,
		required: true,
		unique: true
	},
	media: Object
});

// Model
var User = mongoose.model('user', userSchema);

module.exports = User;
