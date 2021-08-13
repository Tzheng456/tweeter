/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//document ready then do callback
$(() => {
  //append a new tweet element for each tweet given an array of tweet data
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    // tweets = tweets.reverse();
    for (let tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
  };

  //takes a tweet object, returns an HTML string with data from the tweet object
  const createTweetElement = function(tweet) {
    const $tweet = `
    <article class="tweet">
      <div class="tweet-top">
        <div class="tweet-top-left-container">
          <img class="avatar" src=${escape(tweet.user.avatars)}></img>
          <span class="username">${escape(tweet.user.name)}</span>
        </div>
        <span class="user-handle">${escape(tweet.user.handle)}</span>
      </div>
    <textarea class="display-text" disabled>${escape(
    tweet.content.text
  )}</textarea>
      <div class="tweet-bottom">
        <span class="time-posted">${timeago.format(
    escape(tweet.created_at)
  )}</span>
        <span>
          <button class="response-button" type="submit"><i class="fas fa-solid fa-flag"></i></button>
          <button class="response-button" type="submit"><i class="fas fa-solid fa-retweet"></i></button>
          <button class="response-button" type="submit"><i class="fas fa-solid fa-heart"></i></button>
        </span>
      </div>
    </article>`;

    return $tweet;
  };

  //escapes a string to prevent XSS vulnerabilities in form entry
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //makes an ajax GET request to /tweets to render the tweets on page
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" }).then(function(data) {
      //passes the data array in reverse, such that tweets are rendered in reverse-chronological order
      renderTweets(data.reverse());
    });
  };

  //initialize the page with existing tweets in database
  loadTweets();

  //new-tweet form submission event handler
  //serialized the form text into query-string and pass the data to an ajax POST request to /tweets if there are no errors
  const $tweetForm = $("#tweet-form");
  $tweetForm.on("submit", function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log("serialized:", serializedData);

    //error handling for empty string or too-long string
    const tweetTextVal = $("#tweet-text").val();
    const $tooLong = $("#too-long");
    const $emptyInput = $("#empty-input");

    //null or empty string error handling
    if (!tweetTextVal || tweetTextVal.length === 0) {
      //remove any existing error boxes
      $tooLong.slideUp();
      $emptyInput.slideUp();
      $emptyInput
        .html(
          `<i class="fas fa-exclamation-triangle"></i>Cannot submit empty tweet!<i class="fas fa-exclamation-triangle"></i>`
        )
        .slideDown(1000);
      return;
    }

    //input length is greater than 140 chars error handling
    if (tweetTextVal.length > 140) {
      //remove any existing error boxes
      $emptyInput.slideUp();
      $tooLong.slideUp();
      $tooLong
        .html(
          `<i class="fas fa-exclamation-triangle"></i>Message too long! Maximum character count: 140.<i class="fas fa-exclamation-triangle"></i>`
        )
        .slideDown(1000);
      return;
    }

    //remove any existing error boxes then send POST request with data
    // => on success, loadTweets
    $emptyInput.slideUp();
    $tooLong.slideUp();
    $.post("/tweets/", serializedData).then(loadTweets);
  });

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
