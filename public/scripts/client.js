//sanitize user input
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
        <li><img src="../images/retweet-icon.svg" alt="retweet"></li>
          <li><img src="../images/flag-icon.svg" alt="flag"></li>
          <li><img src="../images/like-icon.svg" alt="like"></li>
        </ul>
      </footer>
    </article>`
    return newTweet;
  };

  //Loop array and append to tweet container
  const renderTweets = function (arr) {
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
    const length = $("#tweet-text").val().length;
    const data = $(this).serialize();

    //Length Validation
    if (length <= 0) {
      $('#error').text("There's nothing to tweet!");
      $('#error').slideDown(800);
    } else if (length > 140) {
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

  //Hide / show compose tweet
  $('#write-tweet').click(function() {
    if ($('#compose-tweet').is(':visible')) {
      $('#compose-tweet').hide(800);
    } else {
      $('#compose-tweet').slideDown(400);
      $('#tweet-text').focus();
    }    
  });

  //Logic for button to top (depends on mobile / desktop views)
  const scrollTop = function(min) {
    if (document.documentElement.scrollTop > min) {
      $('#return-to-top').removeClass('to-top-show');
      $('.nav').addClass('nav-hide');
      $('#compose-tweet').hide(800);
    } else {
      $('#return-to-top').addClass('to-top-show');
      $('.nav').removeClass('nav-hide');   
    }
  }

  //button to top
  $(window).scroll(function() {
    if (window.innerWidth > 800) {
      scrollTop(50);
    } else {
      scrollTop(420);
    }
  });

  //On button click
  $('#return-to-top').click(function() {
    document.documentElement.scrollTop = 0;
    $('#compose-tweet').slideDown(1);
    $('#tweet-text').focus();
  });


  //Driver code for example tweets db
  loadTweets();

});