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

  //Loop array and append to tweet container
  const renderTweets = function (arr) {
    arr.forEach((obj) => {
      const $tweet = createTweetElement(obj);
      $('#tweets-container').append($tweet); 
    });
  };

  //Post method to tweets db
  $('#post-tweet').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    //Validation
    if (data.length <= 5) {
      alert("There's nothing to tweet!");
    } else if (data.length > 145) {
      alert("Tweeter isn't for writing novels! Shorten your message");
    } else {
      $.post('/tweets', data, function(data, status) {
        if (status !== 'success'){
          console.log(status);
        }
      });  
    }
  });

  const loadTweets = function() {
    $.get('/tweets', function(data, status) {
      if (status !== 'success') {
        console.log(status);
      }
      renderTweets(data);
    });
  };

  //Driver code
  loadTweets();

});