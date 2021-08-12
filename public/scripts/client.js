/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
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

  renderTweets(data);
});
