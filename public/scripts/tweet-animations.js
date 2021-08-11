$(document).ready(function() {
  $(".tweet-container").on("mouseenter", function(event) {
    $(this).css("box-shadow", "7px 7px #d4d4d4");
  });
  $(".tweet-container").on("mouseleave", function(event) {
    $(this).css("box-shadow", "none");
  });
  $(".response-buttons").on("mouseenter", function(event) {
    $(this).css("color", "#f5b800");
  });
  $(".response-buttons").on("mouseleave", function(event) {
    $(this).css("color", "#2968cb");
  });
});
