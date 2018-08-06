	var mongoose = require ('mongoose');

	var StatusPostSchema = mongoose.Schema({
					//function(user, userID, userImage, id, creationTime, text, image, hashtag, comment, mediaType) {
		user: {
			type: String,
			required: true,
			unique: false
		},
		userID: {
			type: String,
			required: true,
			unique: false
		},
		userImage: {
			type: String,
			required: true,
			uniqu: false
		},
		statusID: {
			type: String,
			required: true,
			unique: true
		},
		source: {
			type: String,
			required: true,
			unique: false
		},
		creationTime: {
			type: String,
			required: true,
			unique: false
		},
		text: {
			type: String,
			required: true,
			unique: true
		},
		// image = image || null;
		hashtag: {
			type: Array,
			required: false,
			unique: false
		},
		comment: {
			type: Array,
			required: false,
			unique: false
		},
		mediaType: {
			type: Object,
			required: true,
			unique: false
		}
	});

// Model
var StatusPost = mongoose.model('post', StatusPostSchema);

module.exports = StatusPost;