var socket = io.connect();

var x = 10;
var y = 10;

var me = {room: null, character: "none", name: "anonymous" };


//var board = {player1: p1, player2: p2, player3: p3};

function Player(room, color){
	this.room = room;
	this.character=null;
	this.color=color;
	this.cards=null; 
}
//#FFBF00 yellow
//#DF0101 red
//#088A08 green
//#BDBDBD white
//#8A0886 purple






function sendmovemessage(){
	socket.emit('move message', testmove);
}



var boardimage = new Image();
boardimage.src = "gameboard.png";

var player1_img = new Image();
var player2_img = new Image();
var player3_img = new Image();

function Room(name,x,y){
	this.name = name;
	this.x=x;
	this.y=y;

}


//ctx.clearRect(0,0,500,200);
var r1 = 138; var r2=200; var r3=265; var r4=325; var r5=395;
var c1 = 115; var c2=175; var c3=245; var c5=300; c6=372;
var study = new Room("study",r1,c1); 
var h1 = new Room("h1", r2,c1); 
var hall = new Room("hall", r3, c1); 
var h2 = new Room("h2",r4,c1); 
var lounge = new Room("lounge", r5, c1); //lounge.name = "lounge";
//var plumstart = new Room("plumstart"); //plumstart.name="plumbstart";
var h3 = new Room("h3", r1, c2); //h3.name="h3";
var h4 = new Room("h4", r3, c2); //h4.name="h4";
var h5 = new Room("h5", r5, c2); //h5.name = "h5";
//var mustardstart = new Room("mustardstart"); //mustardstart.name = "mustardstart";
var library = new Room("library", r1, c3); //library.name="library";
var h6 = new Room("h6", r2, c3); //h6.name="h6";
var billiardroom = new Room("billiardroom", r3, c3); //billiardroom.name="billiardroom";
var h7 = new Room("h7", r4, c3); //h7.name="h7";
var diningroom = new Room("diningroom", r5, c3); //diningroom.name="diningroom";
var h8 = new Room("h8", r1, c5); //h8.name="h8";
var h9 = new Room("h9", r3, c5); //h9.name="h9";
var h10 = new Room("h10", r5, c5); 
var conservatory = new Room("conservatory",r1,c6); //conservatory.name="conservatory";
var h11 = new Room("h11", r2, c6); //h11.name="h11";
var ballroom = new Room("ballroom",r3,c6); //ballroom.name="ballroom";
var h12 = new Room("h12",r4,c6); //h12.name="h12";
var kitchen = new Room("kitchen",r5,c6); //kitchen.name="kitchen";
//var greenstart = new Room("greenstart",r5,c6); //greenstart="greenstart";
//var whitestart = new Room("whitestart",); //whitestart = "whitestart";

//me.room=study;



var player1 = new Player(billiardroom, "#FFBF00");
var player2 = new Player(kitchen, "#DF0101");
var player3 = new Player(conservatory, "#8A0886");
//#FFBF00 yellow
//#DF0101 red
//#088A08 green
//#BDBDBD white
//#8A0886 purple


function drawBoard(){
	//alert();
    //script(type='text/javascript').
	//ctx.clearRect(0,0,500,200);
	var c = document.getElementById("gameBoard");
	var ctx = c.getContext("2d");
    
	//clear the board

    //draw the board image
    	ctx.drawImage(boardimage,10,10);
    
    //draw player 1
    ctx.fillStyle=player1.color;
    ctx.fillRect(player1.room.x, player1.room.y, 20,20);
    
    	
    //draw player2
    ctx.fillStyle=player2.color;
    ctx.fillRect(player2.room.x, player2.room.y,20,20);
    
    	
    //draw player3
    ctx.fillStyle=player3.color;
    ctx.fillRect(player3.room.x, player3.room.y,20,20);	
    	
    	
    //ctx.fillStyle = "#FF0000";
	//ctx.fillRect(r1,c1,20,20);
	//ctx.fillStyle = "#088A08";
    //ctx.fillRect(r3, c3,20,20);
    


}



function moveUp(){

    socket.emit('move', "up");
}

function moveDown(){

    socket.emit('move', "down");
}

function moveLeft(){

    socket.emit('move', "left");
}

function moveRight(){

    socket.emit('move', "right");
}



//Displays a message
function addMessage(msg){

	    var p_list = document.getElementsByTagName("p");
	    if (p_list.length==20){
	    	var p = p_list[0];
	    	p.parentNode.removeChild(p);
	    	
	    }

	$("#chatEntries").append('<div class="message"><p>' + msg);
	
}


//sends a message
function sentMessage() {
    if ($('#messageInput').val() != "") 
    {
    	var addedname=me.name+": "+ $('#messageInput').val();
        socket.emit('chat message', addedname);
        //addMessage($('#messageInput').val());
    }
}


function setName() {
    if ($("#setNameInput").val() != "")
    {
    	me.name=$("#setNameInput").val();
        socket.emit('user name', $("#setNameInput").val());
        //sendmovemessage();
        //$('#chatControls').show();
        //$('#pseudoInput').hide();
        //$('#setname').hide();
    }
}

socket.on('message', function(data) {
	//alert();
    addMessage(data);
});


socket.on('draw', function(data){
	
	drawBoard();
	
	
});

socket.on('player1', function(data){
	player1.room = getRoomFromText(data);
});

socket.on('player2', function(data){
	player2.room = getRoomFromText(data);
});

socket.on('player3', function(data){
	player3.room = getRoomFromText(data);
});


function getRoomFromText(text){
	
	if (text=="study"){
		return study;
	} else if (text=="h1"){
		return h1;
	} else if (text == "hall"){
		return hall;
	} else if (text == "h2"){
		return h2;
	} else if (text == "lounge"){
		return lounge;
	} else if (text == "h3"){
		return h3;
	} else if (text=="h4"){
		return h4;
	} else if (text == "library"){
		return library;
	} else if (text == "h6"){
		return h6;
	} else if (text=="billiardroom"){
		return billiardroom;
	} else if (text=="h7"){
		return h7;
	}else if (text == "diningroom"){
		return diningroom;
	} else if (text == "h8"){
		return h8;
	} else if (text =="h9"){
		return h9;
	} else if (text == "h10"){
		return h10;
	} else if (text == "conservatory"){
		return conservatory;
	} else if (text == "h11"){
		return h11;
	} else if (text=="ballroom"){
		return ballroom;
	} else if (text == "h12"){
		return h12;
	} else if (text=="kitchen"){
		return kitchen;
	}
	
}


function setCharacter(character){
    me.character=character;
    socket.emit('character', me);
    $("#colMustard").hide();
    $("#profPlum").hide(); 
    $("#mrGreen").hide();
    $("#mrsPeacock").hide(); 
    $("#msScarlet").hide();
    $("#mrsWhite").hide();
}

function receiveCharacter(playername, character){
    addMessage(playername + "has chosen" + character);
    if (character == "Colonel Mustard"){
        $("#colMustard").hide();
    } else if (character == "Professor Plum") {
        $("#profPlum").hide(); 
    } else if (character == "Mr Green") {
        $("#mrGreen").hide();
    } else if (character == "Mrs Peacock") {
        $("#mrsPeacock").hide(); 
    } else if (character == "Ms Scarlett") {
        $("#msScarlet").hide();
    } else if (character == "Mrs White") {
        $("#mrsWhite").hide();
    }
}

socket.on('character', function(data){
    receiveCharacter(data.name, data.character);
});

function Guess(){
    alert("your guess is" + $('#card1').val() + " " + $('#card2').val() + " " + $('#card3').val() );
}
    

$(function() {
    //$("#chatControls").hide();
    

    $("#Guess").click(function(){Guess();});
    $("#colMustard").click(function(){setCharacter("Colonel Mustard");});
    $("#profPlum").click(function(){setCharacter("Professor Plum");});
    $("#mrGreen").click(function(){setCharacter("Mr Green");});
    $("#mrsPeacock").click(function(){setCharacter("Mrs Peacock");});
    $("#msScarlet").click(function(){setCharacter("Ms Scarlett");});
    $("#mrsWhite").click(function(){setCharacter("Mrs White");});
    $("#setName").click(function() {setName();});
    $("#submit").click(function() {sentMessage();});
    $("#create").click(function() {drawBoard(); socket.emit('draw', "create");});
    $("#up").click(function() {moveUp();});
    $("#down").click(function() {moveDown();});
    $("#left").click(function() {moveLeft();});
    $("#right").click(function() {moveRight();});    
});




