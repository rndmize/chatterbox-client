// Globals
window.currentRoom = "all";


var createChatRoom = function() {

};

var joinRoom = function(roomName) {
  window.currentRoom = roomName;
  if (window.currentRoom !== "all") {
    $('.message').each(function(m, thing){
      if (thing.roomname !== window.currentRoom) {
        thing.style.display = "none";
      }
    });
  }
  else {
    $('.message').each(function(m, thing){
      thing.style.display = "block";
    });
  }
};
