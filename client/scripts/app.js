
// Creates DOM elements and displays message
var display = function(obj) {
  $('#container').append('<div class="message"></div>');
  $('.message:last').append('<span class="date"></span>');
  $('.date:last').text(obj.createdAt.slice(11, 16) + ' - ');
  $('.message:last').append('<span class="username"></span>');
  $('.username:last').text(obj.username);
  $('.message:last').append('<span class="content"></span>');
  $('.content:last').text(obj.text);
  $('.message:last')[0].setAttribute("room", obj.roomname);
};

// Display most recent message, ignore duplicates
var displayLastMessage = function(obj) {
  if ($('.content:last').text() !== obj.results[0].text) {
    if (window.currentRoom !== "all") {
      if (obj.results[0].roomname === window.currentRoom) {
        display(obj.results[0]);
        $("#container")[0].scrollTop = $("#container")[0].scrollHeight;
      }
    }
    else {
      display(obj.results[0]);
      $("#container")[0].scrollTop = $("#container")[0].scrollHeight;
    }
  }
};

// Create POST data
var makePost = function(message) {
  return {
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
};

// GET data
var get = {
  url: 'https://api.parse.com/1/classes/chatterbox/',
  type: 'GET',
  contentType: 'application/json',
  data: {
    order: '-createdAt',
    limit: 5
  },
  success: function (data) {
    console.log('chatterbox: Messages retrieved');
    displayLastMessage(data);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: No response from server');
  }
};

// Assembles and sends message object
var createMessage = function() {
  var message = {
    'username': document.URL.slice(document.URL.indexOf("=") + 1),
    'text': $('.wordbox').val(),
    'roomname': window.currentRoom
  };
  $('.wordbox').val('');
  // console.log(message);

  if (message.text[0] === '/') {
    parseCommand(message);
  }
  else {
    $.ajax(makePost(message));
  }
};

// Click and enter event handlers
$('.messaginator2000').on('click', createMessage);
$('.wordbox').on('keydown', function(e) {
  if (e.keyCode === 13) {
    createMessage();
  }
});

// Initial retrival
$.ajax(get);

// Retrieve every 500 ms
setInterval(function() {
  $.ajax(get);
}, 500);

