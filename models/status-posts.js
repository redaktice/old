	var StatusPost = function(user, userID, userImage, id, source, postTime, updateTime, text, image, hashtag, comment, mediaType) {
		this.user = user;
		this.userID = userID;
		this.userImage = userImage;
		this.postID = id;
		this.source = source;
		this.postTime = postTime;
		this.updateTime = updateTime;
		this.text = text || null;
		this.image = image || null;
		this.hashtag = hashtag || null;
		this.comment = comment;
		this.mediaType = mediaType;
	};

module.exports = StatusPost;