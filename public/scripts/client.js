/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Vik",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@vr" },
    "content": {
      "text": "Test, test, 123"
    },
    "created_at": 1461113959088
  }
];
    
$(document).ready(function() {

  //HELPER FUNCTIONS//

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
  
    // Append HTML blocks to $article
    $avatarDiv.append($avatarImg, $nameStr);
    $header.append($avatarDiv, $handleStr);
    $iconsDiv.append($flagIcon, $retweenIcon, $heartIcon);
    $footer.append($dateStr , $iconsDiv);
    $article.append($header, $textStr, $footer);
  
    return $article;

  };
  
  const renderTweets = (tweets) => {
    //For each tweet object in tweets array
    for (const tweet of tweets) {
      //Append to existing #tweets-container the result of createTweetElement
      $("#tweets-container").append(createTweetElement(tweet));
    }
  };

  
  //RENDER TWEETS//

  //Render existing tweets from hardcoded data (Array of objects)
  renderTweets(data);

  //POST TWEET TO SERVER ON 'SUBMIT'//

  //Event listener: target #submit-tweet form, listen for submit
  $("#submit-tweet").submit(function(event) {
    event.preventDefault();   // prevent submit from refreshing page
    const newTweetData = ($(this).serialize());  //turns form data into a query string and stores in newTweetData

    $.ajax({
      url: "/tweets", // URL path to send AJAX request
      method: "POST", // type of request
      data: newTweetData //data to send with request
    })
    .then(function(response) { //if request successful send response
      console.log("Request succeeded:", response);
    })
    .catch(function(error) { // if request fails, throw error
      console.log("Request failed:", error);
    });
  
    $(this).trigger("reset");   //reset the form after submission

    
  });

    //GET TWEETS FROM SERVER//
    const loadTweets = function () {
      //
      $.ajax("/tweets", { method: "GET" })
      .then(function (response) {//if request succeeds, response received :) 
        console.log("Success: ", response);
      })
      .catch(function(error) { // if request fails, throw error
        console.log("Request failed:", error);
      });
    }
    //loadTweets called on page load
    loadTweets();



});

