/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const renderTweets = require("./helper-functions");

$(document).ready(function() {
  // //HELPER FUNCTIONS//

  const createTweetElement = (tweetData) => {
    // Extract the necessary data
    const { name, avatars, handle } = tweetData.user;
    const { text } = tweetData.content;
    const date = tweetData.created_at;

    // Build the HTML blocks making the tweet
    // $ "<>" will create element
    // Second object argument passed to $ can include class or ID info
    const $article = $("<article>", { class: "tweet" });
    const $header = $("<header>");
    const $avatarDiv = $("<div>", { class: "avatar" });
    const $avatarImg = $("<img>", { src: avatars });
    const $nameStr = $("<p>").text(name);
    const $handleStr = $("<p>", { class: "handle" }).text(handle);
    const $textStr = $("<p>", { class: "text" }).text(text);
    const $footer = $("<footer>");
    const $dateStr = $("<p>").text(timeago.format(date));
    const $iconsDiv = $("<div>", { class: "icons" });
    const $flagIcon = $("<i>", { class: "fas fa-flag" });
    const $retweenIcon = $("<i>", { class: "fas fa-retweet" });
    const $heartIcon = $("<i>", { class: "fas fa-heart-circle-plus" });

    // Append HTML blocks to $article
    // >> Using append, group smaller elements together, then append groups to parent elements
    $avatarDiv.append($avatarImg, $nameStr);
    $header.append($avatarDiv, $handleStr);
    $iconsDiv.append($flagIcon, $retweenIcon, $heartIcon);
    $footer.append($dateStr, $iconsDiv);
    $article.append($header, $textStr, $footer);

    return $article;
  };

  const renderTweets = (tweets) => {
    //Empty the container each time tweets are rendered
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      //Prepend to container the result of createTweetElement (works in reverse chron order)
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  //POST TWEET TO SERVER ON 'SUBMIT'//

  //Event listener: target #submit-tweet form, listen for submit
  $("#submit-tweet").submit(function(event) {
    event.preventDefault(); // prevent submit from refreshing page
    const newTweetData = $(this).serialize(); //turns form data into a query string and stores in newTweetData
    const charCount = $("#tweet-text").val().length; //Check character count of text input only(no extra chars from query)

    //If charCount 0 or > 140 throw HTML formatted error
    //>>Slide animations take 0.5 secs
    //>>setTimeout used to slideUp error after 3.5 secs
    if (charCount > 140) {
      $(".validation")
        .html(
          '<span class="error"><i class="fa fa-circle-exclamation"></i> Oops, please input a tweet</span>'
        )
        .slideDown(500);
      $(".validation").css("display", "flex");
      setTimeout(function() {
        $(".validation").slideUp(500);
      }, 3500);
    } else if (charCount === 0) {
      $(".validation")
        .html(
          '<span class="error"><i class="fa fa-circle-exclamation"></i> Oops, please input a tweet</span>'
        )
        .slideDown(500);
      $(".validation").css("display", "flex");
      setTimeout(function() {
        $(".validation").slideUp(500);
      }, 3500);
    }

    //If charCount okay, proceed with AJAX post promise chain
    else {
      $.ajax({
        url: "/tweets", // URL path to send AJAX request
        method: "POST", // type of request
        data: newTweetData, //data to send with request
      })
        //if request successful send response
        .then(function(response) {
          console.log("Request succeeded:", response);
        })
        //if send response successful, then call loadTweets function (allows site to render tweet without refresh)
        .then(() => {
          loadTweets();
        })
        //if there is an error anywhere in the promise chain, throw error
        .catch(function(error) {
          console.log("Request failed:", error);
        });
      //reset the form after submission
      $(this).trigger("reset");
    }
  });

  //GET TWEETS FROM SERVER//
  const loadTweets = function() {
    //Get JSON data from /tweets URL
    $.ajax("/tweets", { method: "GET" })
      //if request succeeds, then call renderTweets :)
      .then(function(response) {
        console.log("Success: ", response);
        renderTweets(response);
      })
      //If any promise fails, throw error
      .catch(function(error) {
        console.log("Request failed:", error);
      });
  };

  //loadTweets called on page load for default tweets
  loadTweets();
});
