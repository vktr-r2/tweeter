

// const createTweetElement = (tweetData) => {
//   // Extract the necessary data
//   const { name, avatars, handle } = tweetData.user;
//   const { text } = tweetData.content;
//   const date = tweetData.created_at;

//   // Build the HTML blocks making the tweet
//   // $ "<>" will create element
//   // Second object argument passed to $ can include class or ID info
//   const $article = $("<article>", { class: "tweet" });
//   const $header = $("<header>");
//   const $avatarDiv = $("<div>", { class: "avatar" });
//   const $avatarImg = $("<img>", { src: avatars });
//   const $nameStr = $("<p>").text(name);
//   const $handleStr = $("<p>", { class: "handle" }).text(handle);
//   const $textStr = $("<p>", { class: "text" }).text(text);
//   const $footer = $("<footer>");
//   const $dateStr = $("<p>").text(timeago.format(date));
//   const $iconsDiv = $("<div>", { class: "icons" });
//   const $flagIcon = $("<i>", { class: "fas fa-flag" });
//   const $retweenIcon = $("<i>", { class: "fas fa-retweet" });
//   const $heartIcon = $("<i>", { class: "fas fa-heart-circle-plus" });

//   // Append HTML blocks to $article
//   // >> First append smaller elements together, then append appended elements to larger ones
//   $avatarDiv.append($avatarImg, $nameStr);
//   $header.append($avatarDiv, $handleStr);
//   $iconsDiv.append($flagIcon, $retweenIcon, $heartIcon);
//   $footer.append($dateStr, $iconsDiv);
//   $article.append($header, $textStr, $footer);

//   return $article;
// };

// const renderTweets = (tweets) => {
//   //For each tweet object in tweets array
//   for (const tweet of tweets) {
//     //Append to existing #tweets-container the result of createTweetElement
//     $("#tweets-container").append(createTweetElement(tweet));
//   }
// };

// module.exports = renderTweets;
