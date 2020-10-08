const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


$(document).ready(function() {

  const createTweetElement = function (obj) {
    const newTweet = `
    <article class="old-tweet">
      <header>
        <div>
          <img src="${escape(obj.user.avatars)}" alt="avatar">
          <h6>${obj.user.name}</h6>
        </div>
        <div>
          <h6 class="show-username">${escape(obj.user.handle)}</h6>
        </div>
      </header>
      <p>
        ${escape(obj.content.text)}
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
    //Show newest tweets first
    // arr.reverse();
    arr.forEach((obj) => {
      const $tweet = createTweetElement(obj);
      $('#tweets-container').prepend($tweet); 
    });
  };

  //shows tweet just posted
  const refreshDB = function() {
    $.get('/tweets', function(data, status) {
      if (status !== 'success') {
        console.log(status);
      }
      renderTweets([data[data.length-1]]);
    });
  }

  //Post method to tweets db
  $('#post-tweet').submit(function(event) {
    event.preventDefault();
    $('#error').hide(300);
    const data = $(this).serialize();

    //Validation
    if (data.length <= 5) {
      $('#error').text("There's nothing to tweet!");
      $('#error').slideDown(800);
    } else if (data.length > 145) {
      $('#error').text("Tweeter isn't for writing novels! Shorten your message");
      $('#error').slideDown(800);
    } else {
      $('#tweet-text').val('');
      $('#count').val(140);
      $.post('/tweets', data, function(data, status) {
        if (status !== 'success'){
          console.log(status);
        } else {
          refreshDB();
        }
      });  
    }
  });

  //Initial load
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

  $('#write-tweet').click(function() {
    if ($('#compose-tweet').is(':visible')) {
      $('#compose-tweet').hide(800);
    } else {
      $('#compose-tweet').slideDown(800);
    }    
  });
});