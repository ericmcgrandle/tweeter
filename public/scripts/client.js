$(document).ready(function() {

const createTweetElement = function (obj) {

  const newTweet = `
  <article class="old-tweet">
    <header>
      <div>
        <img src="${obj.user.avatars}" alt="avatar">
        <h6>${obj.user.name}</h6>
      </div>
      <div>
        <h6 class="show-username">${obj.user.handle}</h6>
      </div>
    </header>

    <p>
      ${obj.content.text}
    </p>

    <footer>
      <div>
        10 days ago
      </div>
      <ul>
        <li>share</li>
        <li>flag</li>
        <li>like</li>
      </ul>
    </footer>
  </article>`

  return newTweet;

};


const renderTweets = function (arr) {

  arr.forEach((obj) => {
    const $tweet = createTweetElement(obj);
    $('#tweets-container').append($tweet); 
  });

  
};




// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);

});