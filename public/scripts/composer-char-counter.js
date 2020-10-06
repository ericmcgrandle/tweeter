$(document).ready(function() {

  $('#tweet-text').on("input", function() {
    const length = $(this).val().length; //Length of tweet
    const remChars = 140 - length;

    //this -> div class('tweet-text') -> form -> output('count')
    // $($(this)[0].parentElement.parentElement[2]).text(remChars); 

    $(this).parent().next().find('output').text(remChars);
    
    

    //CHANGE SO JS MANIPULATES CSS?
    if (remChars < 0) {
      $('#count').css('color', '#ff0000');
    } else {
      $('#count').css('color', '#000000');
    }
  });
});