/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // //HELPER FUNCTIONS//
  const createTweetElement = (tweetData) => {
    // Extract the necessary data
    const { name, avatars, handle } = tweetData.user;
    const { text } = tweetData.content;
    const date = tweetData.created_at;

    // Build the HTML blocks making the tweet.  First arg builds element, second arg adds class/id
    const $article = $("<article>", { class: "tweet" });
    const $header = $("<header>");
    const $avatarDiv = $("<div>", { class: "avatar" });
    const $avatarImg = $("<img>", { src: avatars });
    const $nameStr = $("<p>").text(name);
    const $handleStr = $("<p>", { class: "handle" }).text(handle);
    const $textStr = $("<p>", { class: "text" }).text(text);
    const $footer = $("<footer>");
    const $dateStr = $("<p>").text(timeago.format(date)); //timeago used to format date + how long ago it was
    const $iconsDiv = $("<div>", { class: "icons" });
    const $flagIcon = $("<i>", { class: "fas fa-flag" });
    const $retweenIcon = $("<i>", { class: "fas fa-retweet" });
    const $heartIcon = $("<i>", { class: "fas fa-heart-circle-plus" });

    // Append HTML blocks to $article.  First group smaller elements together, then append groups to parent elements
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
      //Prepend to container the result of createTweetElement
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  //POST TWEET TO SERVER ON 'SUBMIT'//
  //Event listener: on submit of the #submit-tweet form
  $(document).on("submit", "#submit-tweet", function (event) {
    event.preventDefault(); // prevent submit from refreshing page
    const newTweetData = $(this).serialize(); //turns form data into a query string and stores in newTweetData
    const charCount = $("#tweet-text").val().length; //Check character count of text input only(no extra chars from query)

    //Handling errors by adding HTML (HTML at end of file)
    //Characters exceeded
    if (charCount > 140) {
      $(".validation").html(charsExceeded).slideDown(500);
      $(".validation").css("display", "flex");
      setTimeout(function () {
        $(".validation").slideUp(500);
      }, 3500);
      //Empty tweet submitted
    } else if (charCount === 0) {
      $(".validation").html(submitEmpty).slideDown(500);
      $(".validation").css("display", "flex");
      setTimeout(function () {
        $(".validation").slideUp(500);
      }, 3500);
    }

    //If no errors, proceed with GET post promise chain
    else {
      $.get({
        url: "/tweets", // URL path to send AJAX request
        method: "POST", // type of request
        data: newTweetData, //data to send with request
      })
        //if request successful send response
        .then(function (response) {
          console.log("Request succeeded:", response);
        })
        //if send response successful, then call loadTweets
        .then(() => {
          loadTweets();
        })
        //if there is an error anywhere in the promise chain, throw error
        .catch(function (error) {
          console.log("Request failed:", error);
        });
      //reset the form after submission
      $(this).trigger("reset");
    }
  });

  //GET TWEETS FROM SERVER//
  const loadTweets = function () {
    //Get JSON data from /tweets URL
    $.ajax("/tweets", { method: "GET" })
      //if request succeeds, then call renderTweets :)
      .then(function (response) {
        console.log("Success: ", response);
        renderTweets(response);
      })
      //If any promise fails, throw error
      .catch(function (error) {
        console.log("Request failed:", error);
      });
  };

  //loadTweets called on page load for default tweets
  loadTweets();
});

//Error for exceeding character count
const charsExceeded =
  '<span class="error"><i class="fa fa-circle-exclamation"></i> Oops, please input a tweet</span>';

//Error for submitting empty tweet
const submitEmpty =
  '<span class="error"><i class="fa fa-circle-exclamation"></i> Oops, please input a tweet</span>';
