var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Chance = require('chance');
var underscore = require('underscore');
var chance = new Chance();
var first = chance.first();
var last = chance.last();
var message = 1;
var bots = [{"botName": chance.first()+" "+ chance.last()}]; //array de bots

app.get('/', function(req, res){

io.on('connection', function(socket){
var chance = new Chance();
	socket.on('chat message', function(msg){		
		io.emit('chat message', {"user":msg.username, "msg":msg.text}); //lo que el user escribio
		underscore.each(bots,function(element, index){
			io.emit('chat message', {"user":element.botName,"msg":chance.pick(['alpha', 'bravo', 'charlie', 'delta', 'echo']),"bot":true});
		});		

	});
	
	socket.on('welcome message', function(username){
		underscore.each(bots,function(element, index){				
			io.emit('welcome message', {"user": element.botName,"msg": "Hi " + username,"bot":false});			
		});
	});	

	socket.on('create user', function(msg){		
		io.emit('create user', {"username":"Anonymous"+ message});
		message++;
	});
	
});

	
  res.sendFile(__dirname + '/index.html');
});

app.get('/createBot', function(req, res){
  //res.sendFile(__dirname + '/index.html');
  bots.push({"botName": chance.first()+" "+ chance.last()});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
