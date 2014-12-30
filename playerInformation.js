var players = [];
var playersLocations = [];
var cards1 = [];
var cards2 = [];
var cards3 = [];
var allowedMoves = {
	study: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	library: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	conservatory: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	hall: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	billiardroom: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	ballroom: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	lounge: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	diningroom: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	kitchen: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"yes"},
	h1: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h2: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h3: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h4: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h5: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h6: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h7: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h8: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h9: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h10: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h11: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"},
	h12: {left:"",right:"",up:"",down:"",multiOccupancyAllowed:"no"}
}
//example message variable
var message = {
action: "move",
room: "library",
direction: "left",
hallway: "",
weapon: "",
person: "Mr Plum",
additionalMessage: ""
}
//check if the type of location is multiple occupancy allowed
function isMoveAllowed(moveLocation) {
	//first check if moveLocation is currently occupied
	if(playersLocations.indexOf(moveLocation)!==-1) {
		//check if moveLocation can accommodate multiple occupancy
		if(allowedMoves[moveLocation]["multiOccupancyAllowed"]==="yes") {
			return 1;
		} else {
			return 0;
		}
	} else {
		return 1;
	}
}
//check if move is allowed
function movePlayer(playerName,moveAction) {
	//moveAction: left,right,up,down
	var playersIndex = players.indexOf(playerName);
	if(allowedMoves[playersLocations[playersIndex]][moveAction]==="") {
		console.log("Move is not allowed!");
	} else {
		//check to see if move is allowed
		if(isMoveAllowed(allowedMoves[playersLocations[playersIndex]][moveAction])) {
			playersLocations[playersIndex]=allowedMoves[playersLocations[playersIndex]][moveAction];
		} else {
			console.log(playerName+" cannot be placed there.");
		}
	}
}
//feed in character name and location
function addPlayer(playerName,playerLocation,card1,card2,card3) {
	//check to see if 'playerName' already exists in a list of players; if it does not, add it
	if(players.indexOf(playerName)===-1) {
		players.push(playerName);
		playersLocations.push(playerLocation);
		cards1.push(card1);
		cards2.push(card2);
		cards3.push(card3);
	} else {
		console.log(playerName+" already exists!");
	}
}
//brings the player being accused to the specified location: playerLocation can only be rooms, not hallways
function bringPlayer(playerName,playerLocation) {
	var playersIndex = players.indexOf(playerName);	
	//first check to see if playerName exists
	if(playersIndex!==-1) {

		//need to update the playersLocations to bring the player from other location to playerLocation
		if(isMoveAllowed(playerLocation)) {
			playersLocations[playersIndex]=playerLocation;
		} else {
			console.log(playerName+" cannot be placed there.");
		}
	} else {
		console.log(playerName+" does not exist!");
	}
}
//remove element from player information arrays: such as when player leaves
function removePlayer(playerName) {
	var indexOfPlayer = players.indexOf(playerName);

	if(indexOfPlayer!==-1) {
		//remove one element from arrays
		players.splice(indexOfPlayer,1);
		playersLocations.splice(indexOfPlayer,1);
		cards1.splice(indexOfPlayer,1);
		cards2.splice(indexOfPlayer,1);
		cards3.splice(indexOfPlayer,1);
	} else {
		console.log(playerName+" does not exist!");
	}
}
//get player information
function getPlayerInformation(playerName) {
	//console.log("players array: "+players[players.indexOf(playerName)]);
	//console.log("playersLocations array: "+playersLocations[players.indexOf(playerName)]);
	//return result in json format
	var returnMessage = {
		action: "playerInformation",
		room: playersLocations[players.indexOf(playerName)],
		card1: cards1[players.indexOf(playerName)],
		card2: cards2[players.indexOf(playerName)],
		card3: cards3[players.indexOf(playerName)],
		person: playerName,
		additionalMessage: ""
	}

	return returnMessage;
}



addPlayer("John","study","pipe","hall","Mr Plum");
movePlayer("John", "left");
//addPlayer("Mike","h1");
//getPlayerInformation("John");
//getPlayerInformation("Mike");

//bringPlayer("Mike","study");

var playerInfo = getPlayerInformation("John");
console.log(playerInfo.person+" is in "+playerInfo.room);

console.log(playerInfo.card1);




