var players = [];
var playersLocations = [];
var cards1 = [];
var cards2 = [];
var cards3 = [];
var cards4 = [];
var cards5 = [];
var cards6 = [];
var turnArray = [0];
//var array
var solution = {
	person: "",
	room: "",
	weapon: ""
}
//weapon array
var weapons = ["revolver","rope","leadpipe","wrench","knife","candlestick"];
//person array
var persons = ["colmustard","profplum","mrgreen","mrspeacock","msscarlet","mrswhite"];
//room array
var rooms = ["hall","lounge","diningroom","kitchen","ballroom","conservatory","billiardroom","library","study"];

var allowedMoves = {
	study: {left:"",right:"h1",up:"",down:"h3",multiOccupancyAllowed:"yes"},
	library: {left:"",right:"h6",up:"h3",down:"h8",multiOccupancyAllowed:"yes"},
	conservatory: {left:"",right:"h11",up:"h8",down:"",multiOccupancyAllowed:"yes"},
	hall: {left:"",right:"h2",up:"",down:"h4",multiOccupancyAllowed:"yes"},
	billiardroom: {left:"h6",right:"h7",up:"h4",down:"h9",multiOccupancyAllowed:"yes"},
	ballroom: {left:"h11",right:"h12",up:"h9",down:"",multiOccupancyAllowed:"yes"},
	lounge: {left:"h2",right:"",up:"",down:"h5",multiOccupancyAllowed:"yes"},
	diningroom: {left:"h7",right:"",up:"h5",down:"h10",multiOccupancyAllowed:"yes"},
	kitchen: {left:"h1",right:"",up:"h10",down:"",multiOccupancyAllowed:"yes"},
	h1: {left:"study",right:"hall",up:"",down:"",multiOccupancyAllowed:"no"},
	h2: {left:"hall",right:"lounge",up:"",down:"",multiOccupancyAllowed:"no"},
	h3: {left:"",right:"",up:"study",down:"library",multiOccupancyAllowed:"no"},
	h4: {left:"",right:"",up:"hall",down:"billiardroom",multiOccupancyAllowed:"no"},
	h5: {left:"",right:"",up:"lounge",down:"diningroom",multiOccupancyAllowed:"no"},
	h6: {left:"library",right:"billiardroom",up:"",down:"",multiOccupancyAllowed:"no"},
	h7: {left:"billiardroom",right:"diningroom",up:"",down:"",multiOccupancyAllowed:"no"},
	h8: {left:"",right:"",up:"library",down:"conservatory",multiOccupancyAllowed:"no"},
	h9: {left:"",right:"",up:"billiardroom",down:"ballroom",multiOccupancyAllowed:"no"},
	h10: {left:"",right:"",up:"diningroom",down:"kitchen",multiOccupancyAllowed:"no"},
	h11: {left:"conservatory",right:"ballroom",up:"",down:"",multiOccupancyAllowed:"no"},
	h12: {left:"ballroom",right:"kitchen",up:"",down:"",multiOccupancyAllowed:"no"}
}
//solution will be initialized
function initializeSolution() {
	var randperson = Math.floor(Math.random()*6);
	solution.person = persons[randperson];
	persons.splice(randperson,1);
	var randweapon = Math.floor(Math.random()*6);
	solution.weapon = weapons[randweapon];
	weapons.splice(randweapon,1);
	var randroom = Math.floor(Math.random()*9);
	solution.room = rooms[randroom];
	rooms.splice(randroom,1);

	//put the remainder of the cards into a pile and randomly distribute
	var tempCardPile = [];
	//randomly splice the element and enter into tempCardPile
	var i = 0;
	while(persons.length > 0) {	
		i = Math.floor(Math.random()* persons.length);
		tempCardPile.push(persons[i]);
		persons.splice(i,1);
	}
	while(weapons.length > 0) {
		i = Math.floor(Math.random()*weapons.length);
		tempCardPile.push(weapons[i]);
		weapons.splice(i,1);
	}
	while(rooms.length > 0) {
		i = Math.floor(Math.random()*rooms.length);
		tempCardPile.push(rooms[i]);
		rooms.splice(i,1);
	}
	

	//get the number of players in the game to divide up the cards
	var numPlayers = players.length;
	var counter = 0;
	while(tempCardPile.length > 0) {
		cards1[counter] = tempCardPile[0];
		cards2[counter] = tempCardPile[1];
		cards3[counter] = tempCardPile[2];
 		cards4[counter] = tempCardPile[3];
		cards5[counter] = tempCardPile[4];
		cards6[counter] = tempCardPile[5];
		tempCardPile.splice(0,6);

		if(counter>players.length){
			counter = 0;
		} else {
			counter++;
		}
	}
}

function cardGuess(playerName,card) {

	var playersIndex = players.indexOf(playerName);
	
	if(cards1[playersIndex]===card) {
		return 1;
	}
	if(cards2[playersIndex]===card) {
		return 1;
	}
	if(cards3[playersIndex]===-1) {
		return 1;
	}
	if(cards4[playersIndex]===-1) {
                return 1;
        }
        if(cards5[playersIndex]===-1) {
                return 1;
        }
        if(cards6[playersIndex]===-1) {
                return 1;
        }
	
	return 0;
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
function addPlayer(playerName,playerLocation) {
	//check to see if 'playerName' already exists in a list of players; if it does not, add it
	if(players.indexOf(playerName)===-1) {
		players.push(playerName);
		playersLocations.push(playerLocation);
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
		cards4.splice(indexOfPlayer,1);
		cards5.splice(indexOfPlayer,1);
		cards6.splice(indexOfPlayer,1);
	} else {
		console.log(playerName+" does not exist!");
	}
}
//get player information
function getPlayerInformation(playerName) {
	var playersIndex = players.indexOf(playerName);
	//console.log("players array: "+players[players.indexOf(playerName)]);
	//console.log("playersLocations array: "+playersLocations[players.indexOf(playerName)]);
	//return result in json format
	var returnMessage = {
		action: "playerInformation",
		room: playersLocations[playersIndex],
		card1: cards1[playersIndex],
		card2: cards2[playersIndex],
		card3: cards3[playersIndex],
		card4: cards4[playersIndex],
		card5: cards5[playersIndex],
		card6: cards6[playersIndex],
		personSource: playerName,
		personDestination: "some other name",
		additionalMessage: ""
	}

	return returnMessage;
}
//turn based logic
function isItMyTurn(playerName) {
	//check to see if current action is allowed based on array lookup
	if(players.indexOf(playerName)===turnArray[0]) {
		return 1;
	} else {
		return 0;
	}
}
//ending turn logic
function endTurn() {
	//increment turnArray[0] by 1 if length of players array is less than turnArray[0]
	if(players.length-1 > turnArray[0]) {
		turnArray[0]++;
	} else {
		turnArray[0]=0;
	}
}

function getSolution() {
	console.log("Person is "+solution.person);
	console.log("Weapon is "+solution.weapon);
	console.log("Room is "+solution.room);
}





//addPlayer("Mike","h1");
//getPlayerInformation("John");
//getPlayerInformation("Mike");

//bringPlayer("Mike","study");
initializeSolution();




addPlayer("John","h1");
var playerInfo = getPlayerInformation("John");
console.log("Player: "+playerInfo.personSource);
console.log("Room: "+playerInfo.room);
console.log("Card1: "+playerInfo.card1);
console.log("Card2: "+playerInfo.card2);
console.log("Card3: "+playerInfo.card3);
console.log("Card4: "+playerInfo.card4);
console.log("Card5: "+playerInfo.card5);
console.log("Card6: "+playerInfo.card6);
addPlayer("Mike","h5");

var playerInfo = getPlayerInformation("Mike");
console.log("Player: "+playerInfo.personSource);
console.log("Room: "+playerInfo.room);
console.log("Card1: "+playerInfo.card1);
console.log("Card2: "+playerInfo.card2);
console.log("Card3: "+playerInfo.card3);
console.log("Card4: "+playerInfo.card4);
console.log("Card5: "+playerInfo.card5);
console.log("Card6: "+playerInfo.card6);

addPlayer("Tester","h11");



var playerInfo = getPlayerInformation("Tester");
console.log("Player: "+playerInfo.personSource);
console.log("Room: "+playerInfo.room);
console.log("Card1: "+playerInfo.card1);
console.log("Card2: "+playerInfo.card2);
console.log("Card3: "+playerInfo.card3);
console.log("Card4: "+playerInfo.card4);
console.log("Card5: "+playerInfo.card5);
console.log("Card6: "+playerInfo.card6);


getSolution();
