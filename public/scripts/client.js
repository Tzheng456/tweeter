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
    for (let tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
    const $tweet = `
    <article class="tweet-container">
      <div class="tweet-top">
        <div class="top-left-box">
          <img class="avatar" src=${escape(tweet.user.avatars)}></img>
          <span class="user-icon">${escape(tweet.user.name)}</span>
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
          <button class="response-buttons" type="submit"><i class="fas fa-solid fa-flag"></i></button>
          <button class="response-buttons" type="submit"><i class="fas fa-solid fa-retweet"></i></button>
          <button class="response-buttons" type="submit"><i class="fas fa-solid fa-heart"></i></button>
        </span>
      </div>
    </article>`;

    return $tweet;
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" }).then(function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

  const $tweetForm = $("#tweet-form");
  $tweetForm.on("submit", function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log("serialized:", serializedData);

    const tweetTextVal = $("#tweet-text").val();
    const $tooLong = $("#too-long");
    const $emptyInput = $("#empty-input");

    if (!tweetTextVal || tweetTextVal.length === 0) {
      $tooLong.slideUp();
      $emptyInput.slideUp();
      $emptyInput
        .html(
          `<i class="fas fa-exclamation-triangle"></i>Cannot submit empty tweet!<i class="fas fa-exclamation-triangle"></i>`
        )
        .slideDown(1000);
      return;
    }

    if (tweetTextVal.length > 140) {
      $emptyInput.slideUp();
      $tooLong.slideUp();
      $tooLong
        .html(
          `<i class="fas fa-exclamation-triangle"></i>Message too long! Maximum character count: 140.<i class="fas fa-exclamation-triangle"></i>`
        )
        .slideDown(1000);
      return;
    }
    $emptyInput.slideUp();
    $tooLong.slideUp();
    $.post("/tweets/", serializedData).then(loadTweets);
  });
});
