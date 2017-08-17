var roomNo;
var player_count;
var playerName;

//Utility Functions ------------------------
function generateRoomCode(){
  var roomNo = ( Math.random() * 100000) | 0;
  document.getElementById("code").innerHTML = roomNo;
  return roomNo;
}

//Game Lobby Functions ------------------------

//UPDATE PLAYER COUNT IN LOBBY
function updatePlayerCount(count){
  $("#lobby_playerCount").html(count);
}

function 

//CREATE ROOM
function createRoom(){
  // Get a reference to the database service
 firebaseDB = firebase.database();
 playerName = document.getElementById("playerName").value;
 roomNo = generateRoomCode();
 document.getElementById("lobby_roomNumber").innerHTML = roomNo;
 var newPlayer = {
                    bombs: 0,
                    diff_bombs: 0,
                    hits: 0,
                    lives: 3
                 }

 var updates = {};
 updates['game/' + roomNo + '/players/' + playerName] = newPlayer;
 //updates['game/' + roomNo + '/room_status'] = "waiting";

var playerCountRef = firebase.database().ref("game/" + roomNo + "/players");
playerCountRef.on('value', function(snapshot) {
  updatePlayerCount(snapshot.numChildren());
});

var roomStatusRef = firebase.database().ref("game/" + roomNo + "/room_status");
roomStatusRef.on('value', function(snapshot) {
  updatePlayerCount(snapshot.numChildren());
});

 return firebase.database().ref().update(updates);
}

function joinRoom(){
 playerName = document.getElementById("playerName").value;
 var roomNo = document.getElementById("roomNumber").value;
 firebaseDB = firebase.database();
 var newPlayer = {
                    bombs: 0,
                    diff_bombs: 0,
                    hits: 0,
                    lives: 3
                 }

 var updates = {};
 updates['game/' + roomNo + '/players/' + playerName] = newPlayer;

var playerCountRef = firebase.database().ref("game/" + roomNo + "/players");
playerCountRef.on('value', function(snapshot) {
  updatePlayerCount(snapshot.numChildren());
});

 return firebase.database().ref().update(updates);
}


//Gameplay Functions ------------------------






