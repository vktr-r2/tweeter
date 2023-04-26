$(document).ready(function() {

  //Select and store the first element with the name "text"
  const textarea = document.getElementsByName("text")[0];
  //Add keyup event listener 
  textarea.addEventListener("keyup", function() {
    //Declare value const and store textarea value >> wrap 'this' with jQuery to create object + use .val() method to get value
    const value = $(this).val();
    //Character count will equal value.length
    const length = value.length;
    console.log(value.length);
  });
});