
/*
 * Room Factory
 */
function createRoom(name,left,right,up,down,sp,ishallway,x,y){
	var o = new Object();
	o.name=name;
	o.x = x;
	o.y = y;
	
	o.occupied = false;
		
	return o;
}



function Room(name){
	this.name = name;
}

Room.prototype.left=null;
Room.prototype.right=null;
Room.prototype.up=null;
Room.prototype.down=null;
Room.prototype.sp = null;
Room.prototype.ishallway = false;
Room.prototype.occupied = false;
Room.prototype.x = 0;
Room.prototype.y =0; 

var study = new Room("study"); //study.name="study";
var h1 = new Room("h1"); //h1.name="h1";
var hall = new Room("hall"); //hall.name = "hall";
var h2 = new Room("h2"); //h2.name = "h2";
var lounge = new Room("lounge"); //lounge.name = "lounge";
var plumstart = new Room("plumstart"); //plumstart.name="plumbstart";
var h3 = new Room("h3"); //h3.name="h3";
var h4 = new Room("h4"); //h4.name="h4";
var h5 = new Room("h5"); //h5.name = "h5";
var mustardstart = new Room("mustardstart"); //mustardstart.name = "mustardstart";
var library = new Room("library"); //library.name="library";
var h6 = new Room("h6"); //h6.name="h6";
var billiardroom = new Room("billiardroom"); //billiardroom.name="billiardroom";
var h7 = new Room("h7"); //h7.name="h7";
var diningroom = new Room("diningroom"); //diningroom.name="diningroom";
var h8 = new Room("h8"); //h8.name="h8";
var h9 = new Room("h9"); //h9.name="h9";
var h10 = new Room("h10"); h10.name="h10";
var conservatory = new Room("conservatory"); //conservatory.name="conservatory";
var h11 = new Room("h11"); //h11.name="h11";
var ballroom = new Room("ballroom"); //ballroom.name="ballroom";
var h12 = new Room("h12"); //h12.name="h12";
var kitchen = new Room("kitchen"); //kitchen.name="kitchen";
var greenstart = new Room("greenstart"); //greenstart="greenstart";
var whitestart = new Room("whitestart"); //whitestart = "whitestart";

function setLR(RoomL, RoomR){
	RoomL.right = RoomR;
	RoomR.left=RoomL;
}

function setUD(RoomU, RoomD){
	RoomD.up = RoomU;
	RoomU.down = RoomD;
}

function setSP(RoomA, RoomB){
	RoomA.sp = RoomB;
	RoomB.sp = RoomA;
}
//study.right = h1;
//h1.left = study;

setLR(study, h1);
setLR(h1, hall);
setLR(hall, h2);
setLR(h2, lounge);
setLR(library, h6);
setLR(h6, billiardroom);
setLR(billiardroom,h7);
setLR(h7,diningroom);
setLR(conservatory,h11);
setLR(h11,ballroom);
setLR(ballroom,h12);
setLR(h12,kitchen);
setSP(study,kitchen);
setSP(lounge,conservatory);
setUD(study,h3);
setUD(hall,h4);
setUD(lounge,h5);
setUD(h3,library);
setUD(h4, billiardroom);
setUD(h5, diningroom);
setUD(library, h8);
setUD(billiardroom, h9);
setUD(diningroom,h10);



function Card(name){
	this.name = name;
}

Card.prototype.owner=null;
Card.prototype.iswinner=false;
var colmustard = new Card("colonel mustard");
var profplum = new Card("professor plum");
var mrgreen = new Card("mr.green");
var mrspeacock = new Card("mrs.peacock");
var msscarlet = new Card("miss scarlet");
var mrswhite = new Card("mrs. white");
var knife= new Card("knife");
var candlestick = new Card("candlestick");
var revolver = new Card("revolver");
var rope = new Card("rope");
var leadpipe = new Card("lead pipe");
var wrench = new Card("wrench");
var hallcard = new Card("hall");
var loungecard = new Card("lounge");
var diningroomcard = new Card("dining room");
var kitchencard = new Card("kitchen");
var ballroomcard = new Card("ballroom");
var conservatorycard = new Card("conservatory");
var billiardcard = new Card("billiard room");
var librarycard = new Card("library");
var studycard = new Card("study");

var Deck = [colmustard, profplum, mrgreen, mrspeacock, msscarlet, mrswhite, knife, 
            candlestick, revolver, rope, leadpipe, wrench, hallcard, loungecard, 
            diningroomcard, kitchencard, ballroomcard, conservatorycard,
            billiardcard, librarycard, studycard];


function shuffle(){
    //pick a random between 0 and 6 for person
    
    //pick a random between 0 and 6 for weapon
    //pick a random between 0 and 9 for room
    
    
	//loop through the array swap each entry with another random card
	var temp;
	var swaplocation;
	for (i=0; i < Deck.length; i++){
		swaplocation = Math.floor(Math.random()*Deck.length);
		temp = Deck[swaplocation];
		Deck[swaplocation]=Deck[i];
		Deck[i]=temp; 
	}
	
	winningcards.push(Deck[0]);
	winningcards.push(Deck[1]);
	winningcards.push(Deck[2]);
	
	var n = 3;
	while (n < Deck.length-1){
		for(j = 0; j < playerlist.length; j++){
			console.log("adding " +Deck[n].name + " to " + playerlist[j].name);
			playerlist[j].cards.push(Deck[n]);
			n++;
		}
	}

}



function Guess(card, target){
	var numberofmatches = 0; 
	var targetcards = [];
	targetcards = target;
	for (i = 0; i < targetcards.length; i++){
		if (card.name == targetcards[i].name){
			numberofmatches++;
		}
		
	}
	return numberofmatches;
	
}






function Player( ){
	this.cards=[];
}

Player.prototype.name="player name";
Player.prototype.room=null;
Player.prototype.character=null;


var Player1 = new Player();
Player1.room = hall;
Player1.name="player 1";
var Player2 = new Player();
Player2.name="player 2";
Player2.room=study;


var playerlist = [];
playerlist.push(Player1);
playerlist.push(Player2);


//move checks if a room exists. if it is occupied. moves the player. then marks the 
//previous room as unoccupied. this is meant to help the checkAction method. 
function move(player, source, destination){
	if (destination == null){
		console.log("room does not exist");
		console.log("you are in" + player.room.name);
		return;
	}
	
	if (destination.occupied == true){
		console.log("someone is already there");
		console.log("you are in" + player.room.name);
		return;
	}
	
	console.log("you are in" + player.room.name);
	source.occupied = false;
	destination.occupied = true;
	player.room = destination; 

	console.log("you are now in " +destination.name);
	
	
}



function checkAction(player, message){
	
	
	
	//check the action type
	var action=message.toString().substring(0, message.length-1);
	console.log("action is " +action);
	//console.log("current room is " +room.name);
	if (action=="up"){
		move(player, player.room, player.room.up);
		//console.log("currentroom is now " +room.name);
	} else if (action=="down"){
		move(player, player.room, player.room.down);
	} else if (action=="left"){
		move(player, player.room, player.room.left);
	} else if (action=="right"){
		move(player, player.room, player.room.right);
		//console.log("currentroom is now " +room.name);
	} else if (action=="sp"){
		move(player, player.room, player.room.sp);
	}
	
	//console.log("currentroom is now " +room.name);
	//for a move action:
	
	//get player's current room
	
	//get the player's target location
	//room = player.getroom();


	
	
	
	
	
}








console.log("hello");
var sys = require("sys");
//var room = study;
var stdin = process.openStdin();
var winningcards=[];
shuffle();
console.log("col muster is in " +Guess(colmustard, Player1.cards));
console.log("col muster is in " +Guess(colmustard, Player2.cards));
console.log("col muster is in " +Guess(colmustard, winningcards));
stdin.addListener("data", function(d) {

    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");
    
    checkAction(Player1, d);
    
  });




