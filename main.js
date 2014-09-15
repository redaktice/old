var word = prompt("Enter any word");
alert("Your word was " + word +".");
alert("There are " + word.length + " characters in your word.");
alert("The third character in your word was " + word.charAt(2) + ".");
alert("In lowercase: " + word.toLowerCase() + ".");
alert("In uppercase: " + word.toUpperCase() + ".");
alert("This is me using the word " + "'" + word + "'" + " in a sentence.");
alert("A subword of your word is " + word.substring(1,5));