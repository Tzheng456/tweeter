$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("input", function(event) {
    const textLength = this.value.length;
    const counter = $(this).siblings(".below-container").children(".counter");

    counter.text(140 - textLength);
    if (counter.val() < 0) {
      counter.css("color", "red");
    }
    if (counter.val() >= 0) {
      counter.css("color", "#545149");
    }
  });
});
