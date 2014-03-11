// Globals
window.currentRoom = 'all';

var parseCommand = function(message) {
  var space = message.text.indexOf(' ');
  var command = message.text.slice(1, space);
  var args;
  if (space !== -1) {
    args = message.text.slice(space + 1);
  } else {
    command = message.text.slice(1);
  }
  if (command === 'join') {
    if (args === undefined) {
      args = 'all';
    }
    joinRoom(args);
  }
};

var createChatRoom = function() {

};

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
};
