var players = [];
var characters = [];
var pseudochar =[];
var colors = [];
var unusedcolors = [];
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
    study: {left:"",right:"h1",up:"",down:"h3", sp:"kitchen", multiOccupancyAllowed:"yes"},
    library: {left:"",right:"h6",up:"h3",down:"h8", sp:"", multiOccupancyAllowed:"yes"},
    conservatory: {left:"",right:"h11",up:"h8",down:"", sp: "lounge", multiOccupancyAllowed:"yes"},
    hall: {left:"",right:"h2",up:"",down:"h4",sp:"",multiOccupancyAllowed:"yes"},
    billiardroom: {left:"h6",right:"h7",up:"h4",down:"h9",sp: "",multiOccupancyAllowed:"yes"},
    ballroom: {left:"h11",right:"h12",up:"h9",down:"",sp:"",multiOccupancyAllowed:"yes"},
    lounge: {left:"h2",right:"",up:"",down:"h5", sp: "conservatory", multiOccupancyAllowed:"yes"},
    diningroom: {left:"h7",right:"",up:"h5",down:"h10",sp: "",multiOccupancyAllowed:"yes"},
    kitchen: {left:"h1",right:"",up:"h10",down:"", sp: "study", multiOccupancyAllowed:"yes"},
    h1: {left:"study",right:"hall",up:"",down:"",sp: "",multiOccupancyAllowed:"no"},
    h2: {left:"hall",right:"lounge",up:"",down:"",sp: "",multiOccupancyAllowed:"no"},
    h3: {left:"",right:"",up:"study",down:"library",sp: "",multiOccupancyAllowed:"no"},
    h4: {left:"",right:"",up:"hall",down:"billiardroom",sp: "",multiOccupancyAllowed:"no"},
    h5: {left:"",right:"",up:"lounge",down:"diningroom",sp: "",multiOccupancyAllowed:"no"},
    h6: {left:"library",right:"billiardroom",up:"",down:"",sp: "",multiOccupancyAllowed:"no"},
    h7: {left:"billiardroom",right:"diningroom",up:"",down:"",sp: "",multiOccupancyAllowed:"no"},
    h8: {left:"",right:"",up:"library",down:"conservatory",sp: "",multiOccupancyAllowed:"no"},
    h9: {left:"",right:"",up:"billiardroom",down:"ballroom",sp: "",multiOccupancyAllowed:"no"},
    h10: {left:"",right:"",up:"diningroom",down:"kitchen",sp: "",multiOccupancyAllowed:"no"},
    h11: {left:"conservatory",right:"ballroom",up:"",down:"",sp: "",multiOccupancyAllowed:"no"},
    h12: {left:"ballroom",right:"kitchen",up:"",down:"",sp: "",multiOccupancyAllowed:"no"}
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
    if(cards3[playersIndex]===card) {
        return 1;
    }
    if(cards4[playersIndex]===card) {
                return 1;
        }
        if(cards5[playersIndex]===card) {
                return 1;
        }
        if(cards6[playersIndex]===card) {
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
        socketlist[playersIndex].emit('message', "Move is not allowed!!!!");
    } else {
        //check to see if move is allowed
        if(isMoveAllowed(allowedMoves[playersLocations[playersIndex]][moveAction])) {
            playersLocations[playersIndex]=allowedMoves[playersLocations[playersIndex]][moveAction];
            io.sockets.emit('message', "moved");
            io.sockets.emit('update');
            for (i=0;i<players.length;i++){
                
                var playerInfo = getPlayerInformation(players[i]);
                io.sockets.emit('create players', getPlayerInformation(players[i]));
            }
            io.sockets.emit('draw', '');
        } else {
            console.log(playerName+" cannot be placed there.");
            socketlist[playersIndex].emit('message', "Move is not allowed!!!!");
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
            //playersLocations[playersIndex]=allowedMoves[playersLocations[playersIndex]][moveAction];
            io.sockets.emit('message', "MOVED");
            io.sockets.emit('update');
            for (i=0;i<players.length;i++){
                
                var playerInfo = getPlayerInformation(players[i]);
                io.sockets.emit('create players', playerInfo);
            }
            io.sockets.emit('draw', '');
        } else {
            console.log(playerName+" cannot be placed there.");
            socketlist[playersIndex].emit('message', "Move is not allowed!!!!");
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
        character: characters[playersIndex],
        color: colors[playersIndex],
        pseudo: pseudochar[playersIndex],
        personSource: playerName,
        personDestination: "some other name",
        additionalMessage: ""
    }

    return returnMessage;
}


function unusedColors(){
  //#FFBF00 yellow
  //#DF0101 red
  //#088A08 green
  //#BDBDBD white
  //#8A0886 purple
  //#0000FF blue
    
    if(colors.indexOf("#FFBF00")==-1){
        unusedcolors.push("#FFBF00");
    }
    if(colors.indexOf("#DF0101")==-1){
        unusedcolors.push("#DF0101");
    }   
    if(colors.indexOf("#088A08")==-1){
        unusedcolors.push("#088A08");
    }
    if(colors.indexOf("#BDBDBD")==-1){
        unusedcolors.push("#BDBDBD");
    }
    if(colors.indexOf("#8A0886")==-1){
        unusedcolors.push("#8A0886");
    }
    if(colors.indexOf("#0000FF")==-1){
        unusedcolors.push("#0000FF");
    }    
    
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
function endTurn(playerName) {
    if(isItMyTurn(playerName)) {
        //increment turnArray[0] by 1 if length of players array is less than turnArray[0]
        if(players.length-1 > turnArray[0]) {
            turnArray[0]++;
        } else {
            turnArray[0]=0;
        }
    } else {
        console.log("It is not your turn!");
    }
}

function getSolution() {
    console.log("Person is "+solution.person);
    console.log("Weapon is "+solution.weapon);
    console.log("Room is "+solution.room);
}


//addPlayer("John","study");
//addPlayer("Mike","library");
//addPlayer("Mike","h1");
//getPlayerInformation("John");
//getPlayerInformation("Mike");

//bringPlayer("Mike","study");
//initializeSolution();









//getSolution();




/////START HERE SERVER STUFF///

//find players and sockets. the user name






var sys = require('sys');
var jade = require('jade');
var express = require('express'), app = express();
var http=require('http'),server=http.createServer(app),io=require('socket.io').listen(server);


app.set('views', __dirname + '/views');
app.set('view engine', 'jade;');
app.set('view options', {layout: false});
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.render('home.jade');
});

server.listen(8080);


var io = require('socket.io').listen(server);


var socketlist = [];
var ready_count=0;
io.sockets.on('connection', function(socket){
	
	socket.on('user name', function(data){
		
		io.sockets.emit('message', data +" has joined the game");
		
		//var join_message = "the current players are ";
		//for (i=0; i < players.length; i++){
		 //   join_message = join_message + " " + players[i];
		//}
		//socket.emit('message', join_message);
		

		
	});

	
	
	socket.on('message', function (data){
			//data = data + count;
			io.sockets.emit('message', data);
			console.log("send this: " +data);
	});
	socket.on('chat message', function (data){
		//data = data + count;
		io.sockets.emit('message', data);
		console.log("send this: " +data);
	});
	
	socket.on('move message', function (data){
		//console.log("received user name" +data.username);
		//console.log("received direction" + data.direction);
		
		if (isItMyTurn(data.name)){
		      movePlayer(data.name,data.action);
		} else {
		    socket.emit('message', "it's not your turn!!");
		}

		
		
	});
	
	socket.on('draw', function(data){
		io.sockets.emit('player1', "h3");
		io.sockets.emit('player2', "h2");
		io.sockets.emit('player3', "h9");
		io.sockets.emit('draw', data);
		console.log("draw");
		

	});
	
	socket.on('end turn', function(data){
	   if(isItMyTurn(data.name)){
	       endTurn(data.name);
	   } else {
	       socket.emit('message', "it's not your turn!!");
	   }
	});
	
    socket.on('Accuse', function(data){
        if(isItMyTurn(data.source)){
            
            if(playersLocations[players.indexOf(data.source)] == data.card3){
                
            
        
            if(solution.person==data.card1 && solution.weapon==data.card2 && solution.room==data.card3){
                io.sockets.emit('message', data.source + " guessed correctly. " +data.source +" is the winner.");
                socket.emit('win', "");
            } else {
                io.sockets.emit('message', data.source + " guessed incorrectly. " +data.source +" has lost.");            
            }
            } else {
                socket.emit('message', "you are not in the right room to make that accusation!");
            }
        } else {
            socket.emit('message', "it's not your turn!!");
        }
     });
     	
    socket.on('game message', function(data){
        if(isItMyTurn(data.source)){
            

            var counter=0;
            var playercounter=players.indexOf(data.source);
            if(data.card3 == playersLocations[playercounter]){
                if (playercounter <= 1){
                    playercounter++;
                } else {
                    playercounter=0;
                }  
            
                var match;
                io.sockets.emit('message', data.source +"'s guess is " + data.card1 + " "+ data.card2+ " " +data.card3);

            
                for (i=0; i<players.length;i++){
                    var playerinfo = getPlayerInformation(players[i]);
                    if (playerinfo.pseudo==data.card1){
                        console.log("bringing player");
                        bringPlayer(players[pseudochar.indexOf(playerinfo.pseudo)], data.card3);
                    }
                }

            if (cardGuess(players[playercounter], data.card1)==1){
                //socket.emit('message', data.player +" has " + data.card);
                match=data.card1;
                counter++;
            }
            
            if (cardGuess(players[playercounter], data.card2)==1){
                //socket.emit('message', data.player +" has " + data.card2);
                counter++;
                match=data.card2;
            }
            if (cardGuess(players[playercounter], data.card3)==1){
                //socket.emit('message', data.player +" has " + data.card3);
                match=data.card3
                counter++;
            }
            
            if (counter > 0){
                socketlist[playercounter].emit('message', "choose a card to show");
                socketlist[playercounter].emit('show', data.source);

            } if (counter==0){
                if (playercounter <= 1){
                    playercounter++;
                } else {
                    playercounter=0;
                }            
                    socketlist[playercounter].emit('message', "choose a card to show");
                    socketlist[playercounter].emit('show', data.source);

                }
            } else {
                socket.emit('message', "you are not in the right location to make that guess!");
            }
        } else {
            socket.emit('message', "it's not your turn!!");
        }

    });
    
    socket.on('show', function(data){
        socketnumber=players.indexOf(data.destination);
        socketlist[socketnumber].emit('message', data.source + " has " +data.card);
        io.sockets.emit('message', data.source+" showed 1 card");

    });
    
    

    socket.on('character', function(data){
        io.sockets.emit('character', data);
        if (data.character=="Colonel Mustard"){
            addPlayer(data.name, "h5");
            colors.push("#FFBF00");
            pseudochar.push("colmustard");
            
        } else if (data.character=="Professor Plum"){
            addPlayer(data.name, "h3");
            colors.push("#8A0886");
            pseudochar.push("profplum");
            
        } else if (data.character=="Mr Green"){
            addPlayer(data.name, "h11");
            colors.push("#088A08");
            pseudochar.push("mrgreen");
            
        } else if (data.character=="Mrs Peacock"){
            addPlayer(data.name, "h8");
            colors.push("#0000FF");
            pseudochar.push("mrspeacock");
            
        } else if (data.character=="Ms Scarlett"){
            addPlayer(data.name, "h2");
            colors.push("#DF0101");
            pseudochar.push("msscarlet");
        } else if (data.character=="Mrs White"){
            addPlayer(data.name, "h12");
            colors.push("#BDBDBD");
            pseudochar.push("mrswhite");
        }   
        
        
        
        
        
        characters.push(data.character);
        socketlist.push(socket);
    });
    
    socket.on('start', function(data){
       ready_count++; 
       if (ready_count==players.length){
           initializeSolution();
           getSolution();
           io.sockets.emit('message', "ALL PLAYERS READY...GAME STARTING");
           unusedColors();
           io.sockets.emit('unused colors', unusedcolors);
           for (i=0;i<players.length;i++){
               socketlist[i].emit('cards', getPlayerInformation(players[i]));
               
               console.log("there are sockets" +socketlist.length);
               
               var playerInfo = getPlayerInformation(players[i]);
               io.sockets.emit('create players', getPlayerInformation(players[i]));
               
               console.log("Player: "+playerInfo.personSource);
               console.log("Room: "+playerInfo.room);
               console.log("Card1: "+playerInfo.card1);
               console.log("Card2: "+playerInfo.card2);
               console.log("Card3: "+playerInfo.card3);
               console.log("Card4: "+playerInfo.card4);
               console.log("Card5: "+playerInfo.card5);
               console.log("Card6: "+playerInfo.card6);
           }
           io.sockets.emit('start', players); 
           
       }


       


    });
    
    
});