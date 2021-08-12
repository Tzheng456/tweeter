/* eslint-disable no-undef */
$(document).ready(function() {
  // --- our code goes here ---
  //input event handler
  $("#tweet-text").on("input", function() {
    const textLength = this.value.length;
    //counter
    const $counter = $(this).siblings(".below-container").children(".counter");

    //updates the counter text based on length of input text
    $counter.text(140 - textLength);

    //change css color attribute based on condition
    if ($counter.val() < 0) {
      $counter.css("color", "red");
    }
    if ($counter.val() >= 0) {
      $counter.css("color", "#545149");
    }
  });
});
