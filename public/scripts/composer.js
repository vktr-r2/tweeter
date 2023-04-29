$(document).ready(function () {
  //Add keyup event listener
  $("#tweet-text").on("input", function () {
    //Declare value const and store $textarea value >> wrap 'this' with jQuery to create object + use .val() method to get value
    const $value = $(this).val();

    //Characters remaining = 140 minus current value length
    const $charsRemaining = 140 - $value.length;

    //Select counter element >> $(this).closest traverses to parent element ".new-tweet" >> find ".counter" traverses back down
    const $counter = $(this).closest(".new-tweet").find(".counter");

    //Target text key of the counter element/obj and assign $charsRemaining to be its value
    $counter.text($charsRemaining);

    if ($charsRemaining < 0) {
      //
      $(".submit-and-count").addClass("over-limit");
    } else {
      $(".submit-and-count").removeClass("over-limit");
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
