$(document).ready(function() {
  //Select and store icons
  
  const $flag = document.getElementsByClassName("fa-flag")[0];
  const $retweet = document.getElementsByClassName("fa-retweet")[0];
  const $like = document.getElementsByClassName("fa-heart-circle-plus")[0];

  //Handle mouseenter + mouseleave on icons
  $($flag).mouseenter(function() {
    $(this).addClass("mouse-enter");
  });

  $($flag).mouseleave(function() {
    $(this).removeClass("mouse-enter");
  });
  
  $($retweet).mouseenter(function() {
    $(this).addClass("mouse-enter");
  });

  $($retweet).mouseleave(function() {
    $(this).removeClass("mouse-enter");
  });
  
  $($like).mouseenter(function() {
    $(this).addClass("mouse-enter");
  });

  $($like).mouseleave(function() {
    $(this).removeClass("mouse-enter");
  });

  //Handle mouseenter + mouseleave on entire article

    $(".tweet").mouseenter(function() {
      $(this).addClass("shadow");
    });
  
    $(".tweet").mouseleave(function() {
      $(this).removeClass("shadow");
    });
  


});