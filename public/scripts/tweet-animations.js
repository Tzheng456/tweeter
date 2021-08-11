$(document).ready(function() {
  $(".response-buttons").on("mouseenter", function(event) {
    $(this).css("color", "#f5b800");
  });
  $(".response-buttons").on("mouseleave", function(event) {
    $(this).css("color", "#2968cb");
  });
});
