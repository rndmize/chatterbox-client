// Globals
window.currentRoom = 'all';

// Ajax request for 100 messages to list recently used rooms
var getRooms = {
  url: 'https://api.parse.com/1/classes/chatterbox/',
  type: 'GET',
  contentType: 'application/json',
  data: {
    order: '-createdAt',
    limit: 100
  },
  success: function (data) {
    var results = {};
    _.each(data.results, function(item) {
      _.each(item, function(item, key) {
        if (key === 'roomname') {
          results[item] = true;
        }
      });
    });
    results = Object.keys(results);
    var rooms = {}; // Message obj for display()
    rooms.text = results.join(', ');
    rooms.username = 'SERVER -';
    rooms.createdAt = '';
    display(rooms);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: No response from server');
  }
};

// Parses slash commands and args
var parseCommand = function(message) {
  var space = message.text.indexOf(' ');
  var command = message.text.slice(1, space);
  var args;
  if (space !== -1) {
    args = message.text.slice(space + 1);
  } else {
    command = message.text.slice(1);
  }

  // Join room
  if (command === 'join') {
    if (args === undefined) {
      args = 'all';
    }
    joinRoom(args);
  }

  // List rooms
  else if (command === 'rooms') {
    $.ajax(getRooms);
  }
};

// Filters messages to specified room only
var joinRoom = function(roomName) {
  window.currentRoom = roomName;
  if (window.currentRoom !== 'all') {
    $('.message').each(function(m, thing){
      if (thing.roomname !== window.currentRoom) {
        thing.style.display = 'none';
      }
    });
  }
  else {
    $('.message').each(function(m, thing){
      thing.style.display = 'block';
    });
  }
  display({username: 'SERVER -', text: 'Joined room ' + window.currentRoom, createdAt: ''});
};
