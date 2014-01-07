var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');


if( process.argv.length < 4 ) {
	console.log('Please provide grid position.');
	process.exit(1);
}

var grid = [];

// 10x10
grid[0] = parseInt(process.argv[2]);
grid[1] = parseInt(process.argv[3]);

// Create port based on grid position.

var portBase = '400';

var port = parseInt(''+portBase+grid[0]+grid[1]);

console.log('Port: '+port);

console.log('Grid Position: '+grid[0]+','+grid[1]);

app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('ready');
  socket.on('ping', function (data) {
    socket.emit('pong',{timestamp: data.timestamp});
  });
});