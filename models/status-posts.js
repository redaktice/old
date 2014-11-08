	var StatusPost = function(user, userImage, id, postTime, text, image, hashtag, comment, mediaType) {
		this.user = user;
		this.userImage = userImage;
		this.postID = id;
		this.postTime = postTime;
		this.text = text || null;
		this.image = image || null;
		this.hashtag = hashtag || null;
		this.comment = comment;
		this.mediaType = mediaType;
	};

module.exports = StatusPost;