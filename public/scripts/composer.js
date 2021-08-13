/* eslint-disable no-undef */
$(() => {
  //slides the compose tweet box up or down
  const $newTweetIcon = $("#new-tweet-icon");
  const $newTweet = $(".new-tweet");
  $newTweetIcon.on("click", () => {
    $newTweet.slideToggle(333);
  });

  //button click slides to top of the page and enables the compose tweet box
  const $toPageTop = $("#to-page-top");
  $toPageTop.on("click", () => {
    $newTweet.slideDown();
    $("html").scrollTop(0);
  });

  //displays a different button on the page based on the scroll state of the page
  const $document = $(document);
  $document.on("scroll", () => {
    if ($document.scrollTop() > 0) {
      $newTweetIcon.css("visibility", "hidden");
      $toPageTop.css("display", "block");
    } else {
      $newTweetIcon.css("visibility", "visible");
      $toPageTop.css("display", "none");
    }
  });
});
