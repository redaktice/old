	var StatusPost = function(user, userID, userImage, id, postTime, text, image, hashtag, comment, mediaType) {
		this.user = user;
		this.userID = userID;
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