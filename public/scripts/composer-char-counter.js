$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("input", function(event) {
    const textLength = this.value.length;
    const counter = $(this).siblings(".below-container").children(".counter");

    if (counter.val() < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#797979");
    }
    counter.text(140 - textLength);
  });
});
