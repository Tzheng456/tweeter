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

  const $document = $(document);
  $document.on("scroll", () => {
    if ($document.scrollTop() > 0) {
      $toPageTop.css("display", "block");
    } else {
      $toPageTop.css("display", "none");
    }
  });
});
