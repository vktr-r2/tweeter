/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Vik",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@vktr-r2"
    },
  "content": {
      "text": "Working with HTML + JQuery + the DOM is difficult"
    },
  "created_at": 1461116232227
}

const createTweetElement = (tweetData) => {
  // Extract the necessary data
  const { name, avatars, handle } = tweetData.user;
  const { text } = tweetData.content;
  const date = tweetData.created_at;

    // Build the HTML blocks making the tweet
    // $ "<>" will create element
    // Second object argument passed to $ can include class or ID info
    const $article = $("<article>", { "class": "tweet" });
    const $header = $("<header>");
    const $avatarDiv = $("<div>", { "class": "avatar" });
    const $avatarImg = $("<img>", { "src": avatars });
    const $nameStr = $("<p>").text(name);
    const $handleStr = $("<p>", { "class": "handle" }).text(handle);
    const $textStr = $("<p>", { "class": "text" }).text(text);
    const $footer = $("<footer>");
    const $dateStr = $("<p>").text(date);
    const $iconsDiv = $("<div>", { "class": "icons" });
    const $flagIcon = $("<i>", { "class": "fa-solid fa-flag" });
    const $retweenIcon = $("<i>", { "class": "fa-solid fa-retweet" });
    const $heartIcon = $("<i>", { "class": "fa-solid fa-heart-circle-plus" });
  
    
    return $article;


};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.