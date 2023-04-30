$(document).ready(function () {
  //Declare $counter so it can be used across multiple listeners
  const $counter = $(".new-tweet .counter");

  //TEXT INPUT EVENT LISTENER >> manage character counter
  $("#tweet-text").on("input", function () {
    //Use 140 minus current length of text input string (this) to calculate charsRemaining
    const $charsRemaining = 140 - $(this).val().length;

    //Target counter element and change $charsRemaining to be the text appearing with .text()
    $counter.text($charsRemaining);

    //Add/remove red text to character counter
    if ($charsRemaining < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  });

  //FORM SUBMIT LISTENER >> reset character count
  $("form").on("submit", function () {
    $counter.text(140);
  });

  //NAV BUTTON CLICK LISTENER >> Toggles ".new-tweet" form visibility
  $(".nav-button").click(function () {
    $(".new-tweet").slideToggle();
  });
});
