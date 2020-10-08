$(document).ready(function() {

  $('#tweet-text').on("input", function() {
    const length = $(this).val().length; //Length of tweet
    const remChars = 140 - length;

    $(this).parent().next().find('output').text(remChars);
    
    if (remChars < 0) {
      $('#count').addClass('red');
    } else {
      $('#count').removeClass('red');
    }
  });
});