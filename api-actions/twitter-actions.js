var Twitter = require('twitter');
var keys = require('../private/keys');

var twitterAPI = new Twitter({
	consumer_key: keys.twitter.consumerKey,
	consumer_secret: keys.twitter.consumerSecret
});