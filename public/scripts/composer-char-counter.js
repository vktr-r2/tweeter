$(document).ready(function() {
  const textarea = document.getElementsByName("text")[0];
  // let x = 0  //REMOVE BEFORE PROD//
  //input listener because it will allow us to see input && counts copy+paste
  textarea.addEventListener("input", function() {
    // x ++;    //REMOVE BEFORE PROD//
    // console.log(x)   //REMOVE BEFORE PROD//
  });

});