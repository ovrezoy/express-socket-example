var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000
  
server.listen(port,() => {
  console.log(`Server running at port `+port);
});
  
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) { 
    socket.on('chat.message', function(message) { 
        io.emit('chat.message', message);
    });
  
	
    socket.on('disconnect', function() { 
        io.emit('chat.message', 'User has disconnected.');
    });
});