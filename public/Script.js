var socket = io.connect();

var x = 10;
var y = 10;

var me = {room: null, character: "none", name: "anonymous", action:"none" };
var players = []; 
var showdestination ="";
var unusedcolors = [];

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
function gameMessage(){
        this.player=me.name;
        this.action= "";
        this.room= ""; //needs to be card1
        this.direction=""; //needs to be card2
        this.hallway=""; //needs to be card3
        this.weapon="";
        this.person="";
        this.additionalMessage="";
};






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
//var c1_ = 125; var c2_=185; var c3_=255; var c5_=310; var c6_=382;
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



var player1;
var player2;
var player3;



function drawBoard(){
	//alert();
    //script(type='text/javascript').
	//ctx.clearRect(0,0,500,200);
	var c = document.getElementById("gameBoard");
	var ctx = c.getContext("2d");
    
	//clear the board

    //draw the board image
    ctx.drawImage(boardimage,10,10);
    
    
    
    for(i=0;i<players.length;i++){
        ctx.fillStyle=players[i].color;
        var playerRoom = getRoomFromText(players[i].room);
        
        if(i==1 || i ==2){
            if (players[i].room == players[i-1].room){
                var newy = playerRoom.y+10;
                ctx.fillRect(playerRoom.x, newy, 20,20);
            } else {
                ctx.fillRect(playerRoom.x, playerRoom.y, 20,20);
            }
        }
        if(i==0){

           ctx.fillRect(playerRoom.x, playerRoom.y, 20,20);
           
        }
      
    }

    //#FFBF00 yellow
    //#DF0101 red
    //#088A08 green
    //#BDBDBD white
    //#8A0886 purple
    //#0000FF blue
    var r=0;
    var c=0;
    if(unusedcolors.indexOf("#FFBF00")!=-1){
        ctx.fillStyle="#FFBF00";
        r=r5+80;
        ctx.fillRect(r, c2, 20,20);
    }
    if(unusedcolors.indexOf("#DF0101")!=-1){
        ctx.fillStyle="#DF0101";
        c=c1-60;
        ctx.fillRect(r4, c, 20,20);
    }   
    if(unusedcolors.indexOf("#088A08")!=-1){
        ctx.fillStyle="#088A08";
        c=c5+129;
        ctx.fillRect(r2, c, 20,20);
    }
    if(unusedcolors.indexOf("#BDBDBD")!=-1){
        ctx.fillStyle="#BDBDBD";
        c=c5+129;
        ctx.fillRect(r4, c, 20,20);
    }
    if(unusedcolors.indexOf("#8A0886")!=-1){
        ctx.fillStyle="#8A0886";
        r=r1-60;
        ctx.fillRect(r, c2, 20,20);
    }
    if(unusedcolors.indexOf("#0000FF")!=-1){
        ctx.fillStyle="#0000FF";
        r=r1-60;
        ctx.fillRect(r, 295, 20,20);
    }    
          
     
    //draw player 1
    //ctx.fillStyle=player1.color;
    //ctx.fillRect(player1.room.x, player1.room.y, 20,20);
    
    	
    //draw player2
    //ctx.fillStyle=player2.color;
    //ctx.fillRect(player2.room.x, player2.room.y,20,20);
    
    	
    //draw player3
    //ctx.fillStyle=player3.color;
    //ctx.fillRect(player3.room.x, player3.room.y,20,20);	
    	
    	
    //ctx.fillStyle = "#FF0000";
	//ctx.fillRect(r1,c1,20,20);
	//ctx.fillStyle = "#088A08";
    //ctx.fillRect(r3, c3,20,20);
    


}



function moveUp(){
    me.action="up";
    socket.emit('move message', me);
}

function moveDown(){
    me.action="down";
    socket.emit('move message', me);
}

function moveLeft(){
    me.action=("left");
    socket.emit('move message', me);
}

function moveRight(){
    me.action=("right");
    socket.emit('move message', me);
}

function moveSP(){
    me.action=("sp");
    socket.emit('move message', me);
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
	} else if (text == "h5"){
		return h5;
	} else if (text == "h6"){
        return h6;
    }else if (text=="billiardroom"){
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
    $("#start").show();
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


socket.on('start', function(data){
    
    for (i=0; i<data.length; i++){
        $("#player").append('<option>' +data[i]+'</option>');
    }
    drawBoard();
});






socket.on('create players', function(data){
   players.push(data); 
});

socket.on('win', function(data){
    alert("you win!");
 });

socket.on('show', function(data){
    showdestination=data;
});

socket.on('update', function(data){
    players=[];
});

socket.on('unused colors', function(data){
    unusedcolors = data;
    //alert(unusedcolors[0]+unusedcolors[1]+unusedcolors[2]);
});


socket.on('cards', function(data){
   
    var your_cards = "your cards: ";
    var your_cards2 = "list 2";
    if (data.card1 != ""){
        your_cards = your_cards+" " +data.card1; 
    }
    
    if (data.card2 != ""){
        your_cards = your_cards+" " +data.card2; 
    }
    if (data.card3 != ""){
        your_cards = your_cards+" " +data.card3; 
    }
    
    if (data.card4 != ""){
        your_cards = your_cards+" " +data.card4; 
    }
    
    if (data.card5 != ""){
        your_cards = your_cards+" " +data.card5; 
    }
    if (data.card6 != ""){
        your_cards = your_cards+" " +data.card6; 
    }
    
    
    $('#yourCards').append('<li>' + your_cards + '</li>');

    $("#showCards").append('<option>' +data.card1+'</option>');
    $("#showCards").append('<option>' +data.card2+'</option>');
    $("#showCards").append('<option>' +data.card3+'</option>');
    $("#showCards").append('<option>' +data.card4+'</option>');
    $("#showCards").append('<option>' +data.card5+'</option>');
    $("#showCards").append('<option>' +data.card6+'</option>');
});



function Guess(){
    //alert("your guess is" + $('#card1').val() + " " + $('#card2').val() + " " + $('#card3').val() );
    //var guess_message = new gameMessage();
    //guess_message.card1 = $('#card1').val();
    //guess_message.card2 = $('#card2').val();
    //guess_message.card3 = $('#card3').val();
    
    var Guess = {source: me.name, player: $('#player').val(), card1: $('#card1').val(),card2: $('#card2').val(), card3: $('#card3').val()};

    socket.emit('game message', Guess);

    
    
}


function Accuse(){
    //alert("your guess is" + $('#card1').val() + " " + $('#card2').val() + " " + $('#card3').val() );
    //var guess_message = new gameMessage();
    //guess_message.card1 = $('#card1').val();
    //guess_message.card2 = $('#card2').val();
    //guess_message.card3 = $('#card3').val();
    
    var Guess = {source: me.name, player: $('#player').val(), card1: $('#card1').val(),card2: $('#card2').val(), card3: $('#card3').val()};

    socket.emit('Accuse', Guess);

    
    
}






function showcard(){
    var info={source:me.name, card: $("#showCards").val(), destination:showdestination};
    
    socket.emit('show', info);
}


    

$(function() {
    //$("#chatControls").hide();
    
    $("#endTurn").click(function(){socket.emit('end turn', me);});
    $("#Show").click(function(){showcard();});
    $("#start").hide();
    $("#start").click(function(){socket.emit('start', me); $("#start").hide();});
    $("#Guess").click(function(){Guess();});
    $("#Accuse").click(function(){Accuse();});
    $("#colMustard").click(function(){setCharacter("Colonel Mustard");});
    $("#profPlum").click(function(){setCharacter("Professor Plum");});
    $("#mrGreen").click(function(){setCharacter("Mr Green");});
    $("#mrsPeacock").click(function(){setCharacter("Mrs Peacock");});
    $("#msScarlet").click(function(){setCharacter("Ms Scarlett");});
    $("#mrsWhite").click(function(){setCharacter("Mrs White");});
    $("#setName").click(function() {setName(); $("#setName").hide(); document.getElementById('setNameInput').style.visibility = 'hidden';});
    $("#submit").click(function() {sentMessage();});
    $("#create").click(function() {drawBoard(); socket.emit('draw', "create");});
    $("#up").click(function() {moveUp();});
    $("#down").click(function() {moveDown();});
    $("#left").click(function() {moveLeft();});
    $("#right").click(function() {moveRight();});
    $("#sp").click(function() {moveSP();});     
});




