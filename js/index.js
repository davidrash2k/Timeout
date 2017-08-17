var roomNo;
var gamePlayerCount;
var playerName;
var playersJson = [];
var playerID;

//Utility Functions ------------------------
function generateRoomCode(){
  var roomNo = ( Math.random() * 100000) | 0;
  document.getElementById("code").innerHTML = roomNo;
  return roomNo;
}

//Game Lobby Functions ------------------------

//UPDATE PLAYER COUNT IN LOBBY

function emptyList(){
    $("#lobby_playerList").empty();
}

function updatePlayerCount(count){
  $("#lobby_playerCount").html(count);
}

function updatePlayerListUI(){
  $("#lobby_playerList").empty();
  playersJson.forEach(function(element){
      $("#lobby_playerList").append("<li> " + element.p_name + "</li>");
  });
}

function updatePlayerList(snapshot){
  //var ctr = 0;
  console.log("PLAYER LIST UPDATED");
  console.log("playerKey:" + snapshot.key);
  console.log("playerName:" + snapshot.val().p_name);

  //check if key already exists in json
  if(JSON.stringify(playersJson).indexOf(snapshot.key) == -1){

        var key = snapshot.key;
        var name = snapshot.val().p_name;

        item = {}
        item ["key"] = key;
        item ["p_name"] = name;
        playersJson.push(item);

    console.log(playersJson);

    updatePlayerListUI();
  }

}


//CREATE ROOM
function createRoom(){
  // Get a reference to the database service
 firebaseDB = firebase.database();
 playerName = document.getElementById("playerName").value;
 roomNo = generateRoomCode();
 document.getElementById("lobby_roomNumber").innerHTML = roomNo;

 var playerCountRef = firebase.database().ref("game/" + roomNo + "/players");

 var key = playerCountRef.push().key;

 var newPlayer = {
                    p_name: playerName.toString(),
                    diff_bombs: 0,
                    hits: 0,
                    lives: 3
                 }

 var updates = {};
 updates['game/' + roomNo + '/players/' + key] = newPlayer;

playerCountRef.on('value', function(snapshot) {
  updatePlayerCount(snapshot.numChildren());
});

  var playerNamesRef = firebase.database().ref("game/" + roomNo + "/players").orderByKey();
  playerNamesRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      updatePlayerList(childSnapshot);
      // childData will be the actual contents of the child
      //var childData = childSnapshot.val();
  });
});

return firebase.database().ref().update(updates);
}

function joinRoom(){
 playerName = document.getElementById("playerName").value;
 var roomNo = document.getElementById("roomNumber").value;
 firebaseDB = firebase.database();
 var playerCountRef = firebase.database().ref("game/" + roomNo + "/players");
 var key = playerCountRef.push().key;

    var newPlayer = {
                      p_name: playerName.toString(),
                      diff_bombs: 0,
                      hits: 0,
                      lives: 3
                   }

   var updates = {};
   updates['game/' + roomNo + '/players/' + key] = newPlayer;

   playerCountRef.on('value', function(snapshot) {
    console.log("SNAPSHOT: " + JSON.stringify(snapshot));
    /*console.log("SNAPSHOT: " + snapshot.key);
    console.log("SNAPSHOT: " + snapshot.key.child);
    console.log("SNAPSHOT: " + snapshot.val());
    console.log("SNAPSHOT: " + snapshot.child().val());*/
    updatePlayerCount(snapshot.numChildren());
  });

  var playerNamesRef = firebase.database().ref("game/" + roomNo + "/players").orderByKey();
  playerNamesRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      updatePlayerList(childSnapshot);
      // childData will be the actual contents of the child
      //var childData = childSnapshot.val();
  });
});


  //console.log("JOIN ROOM");
 return firebase.database().ref().update(updates);

}


//Gameplay Functions ------------------------


//ADD BOMB TO TARGET PLAYER
function plantBomb(playerSource, playerDestination, bombTime){
firebaseDB = firebase.database()
var newBombKey = firebaseDB.ref("/game" + roomNo + "/player" + playerDestination + "/bombs").push().key;
var newBomb = {
                 time: bombTime,
                 source: playerSource
              }

var updates = {};
updates['game/' + roomNo + '/players/' + playerDestination + "/bombs/" + newBombKey] = newBomb;
return firebase.database().ref().update(updates);
}








