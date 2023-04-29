$(document).ready(function () {
  //Add keyup event listener
  $("#tweet-text").on("input", function () {

    //Use 140 minus current length of text input string (this) to calculate charsRemaining
    const $charsRemaining = 140 - $(this).val().length;

    //Select counter element >> .closest() traverses to parent element, find() traverses back down to target
    const $counter = $(this).closest(".new-tweet").find(".counter");

    //Target counter element and change $charsRemaining to be the text appearing with .text()
    $counter.text($charsRemaining);

    if ($charsRemaining < 0) {
      //
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  });

  // Reset $charsRemaining to 140 after tweet submit
  $("form").on("submit", function () {
    const $counter = $(this).closest(".new-tweet").find(".counter");
    $counter.text(140);
  });

  //Listener targeting nav button.  Toggles new-tweet form visibility
  $(".nav-button").click(function () {
    $(".new-tweet").slideToggle();
  });
});
