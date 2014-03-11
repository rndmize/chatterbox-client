// List of users object
var people = {};

// Add self to list
var me = document.URL.slice(document.URL.indexOf('=') + 1);
people[me] = {};
people[me].group = 'me';

var groupCheck = function(user) {
  if (people[user]) {
    return people[user].group;
  }
  else {
    console.log('THAT GUY DON\'T EXIST YO\'');
  }
};

var getUsernameSpans = function(userName) {
  return $('.username').filter(function(huh, elem) {
    if ($(elem).text() === userName) {
      return true;
    }
    else {
      return false;
    }
  });
};

$('#container').on('click', '.username', function(event) {
  //console.log(this);
  var user = $(this).text();
 //  console.log(user);
  var group = groupCheck(user);
  $usernameSpans = getUsernameSpans(user);
  if (group === null) {
    people[user].group = 'friend';
    $usernameSpans.attr('group', 'friend');

  }
  else if (group === 'friend') {
    people[user].group = 'frenemy';
    $usernameSpans.attr('group', 'frenemy');
  }
  else if (group === 'frenemy') {
    people[user].group = 'enemy';
    $usernameSpans.attr('group', 'SILENCE');
  }
  else if (group === 'enemy') {
    people[user].group = null;
    $usernameSpans.attr('group', 'null');
  }
});
