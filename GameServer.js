
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

function player(name,socket,character){
    this.name=name;
    this.socket=socket;
    this.character=character;
}





var userlist = [];
var socketlist = [];
var count=0;
io.sockets.on('connection', function(socket){
	
	socket.on('user name', function(data){
		userlist.push(data);
		socketlist.push(socket); //when the user name is set add him to the socketlist too
		console.log("user " + data +"has been added to the users");
		console.log("userlist" +userlist[0]);
		console.log("socketlist" + socketlist[0]);
		
		if (socketlist.length == 3){
		//io.sockets.emit('message', "all users joined. assigning characters");
		socketlist[0].emit('id', "player1");
		socketlist[1].emit('id', "player2");
		socketlist[2].emit('id', "player3");
		//socketlist[2].emit('message', "all users joined. game starting");
		socketlist[0].emit('player1', "h3");
		socketlist[1].emit('player2', "h2");
		socketlist[2].emit('player3', "h9");
		}
		
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
		console.log("received user name" +data.username);
		console.log("received direction" + data.direction);
		
	});
	
	socket.on('draw', function(data){
		io.sockets.emit('player1', "h3");
		io.sockets.emit('player2', "h2");
		io.sockets.emit('player3', "h9");
		io.sockets.emit('draw', data);
		console.log("draw");
	});
	
    socket.on('character', function(data){
        io.sockets.emit('character', data);
    });
});