// YOUR CODE HERE:

// YOUR CODE HERE:

var displayLastMessage = function(obj) {
  if ($('.message:last').text() !== obj.results[0].text) {
    $('body').append('<p class="message"></p>');
    $('.message:last').text(obj.results[0].text);
  }
};

var displayMessages = function(data) {
  _.each(data.results, function(item) {
    display(item);
  });
};

var display = function(obj) {
  console.log(obj);
  $('#main').append('<div class="message"></div>');
  $('.message:last').html('<span class="username"></span>');
  $('.username:last').text(obj.username);
  $('.message:last').append('<span class="content"></span>');
  $('.content:last').text(obj.text);
};

var get = {
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Messages retrieved');
    window.mess = data;
    displayMessages(data);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: No response from server');
  }
};

var message = {
  'username': 'aria',
  'text': 'testing',
  'roomname': '4chan'
};

var post = {
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
};

$.ajax(get);


// setInterval(function() {

//   $.ajax(get);
// }, 2000);
