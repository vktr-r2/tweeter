$(document).ready(function() {

  //Select and store the first element with the name "text"
  const $textarea = document.getElementsByName("text")[0];

  //Add keyup event listener 
  $textarea.addEventListener("keyup", function() {

    //Declare value const and store $textarea value >> wrap 'this' with jQuery to create object + use .val() method to get value
    const $value = $(this).val();
  
    //Characters remaining = 140 minus current value length
    const $charsRemaining = 140 - $value.length;
    
    //Select counter element >> $(this).closest traverses to parent element ".new-tweet" >> find ".counter" traverses back down
    const $counter = $(this).closest(".new-tweet").find(".counter");

    //Target text key of the counter element/obj and assign $charsRemaining to be its value
    $counter.text($charsRemaining);

    
    if ($charsRemaining <= 0) {
      $(".submit-and-count").addClass("over-limit");
    } else {
      $(".submit-and-count").removeClass("over-limit");
    }

  });
});