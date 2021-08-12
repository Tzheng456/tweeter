/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }

    $(".tweet-container").on("mouseenter", function() {
      $(this).css("box-shadow", "7px 7px #d4d4d4");
    });
    $(".tweet-container").on("mouseleave", function() {
      $(this).css("box-shadow", "none");
    });
    $(".response-buttons").on("mouseenter", function() {
      $(this).css("color", "#f5b800");
    });
    $(".response-buttons").on("mouseleave", function() {
      $(this).css("color", "#2968cb");
    });
  };

  const createTweetElement = function(tweet) {
    const tweetHTML = `
      <div class="tweet-top">
        <div class="top-left-box">
          <img class="avatar" src=${tweet.user.avatars}></img>
          <span class="user-icon">${tweet.user.name}</span>
        </div>
        <span class="user-handle">${tweet.user.handle}</span>
      </div>
      <textarea class="display-text" disabled>${tweet.content.text}</textarea>
      <div class="tweet-bottom">
        <span class="time-posted">${timeago.format(tweet.created_at)}</span>
        <span>
          <button class="response-buttons" type="submit"><i class="fas fa-solid fa-flag"></i></button>
          <button class="response-buttons" type="submit"><i class="fas fa-solid fa-retweet"></i></button>
          <button class="response-buttons" type="submit"><i class="fas fa-solid fa-heart"></i></button>
        </span>
      </div>`;

    const $tweet = $("<article>").addClass("tweet-container");

    const tweetElement = $tweet.append(tweetHTML);

    return tweetElement;
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

    $.post("/tweets/", serializedData).then(loadTweets);
  });
});
