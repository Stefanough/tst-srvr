// var app = require('http').createServer(handler);
// var fs = require('fs');
// const path = require('path');

// let filePath = './server/index.html';
// let dir = path.join(__dirname, 'public');


const http = require('http');
const fs = require('fs');
const io = require('socket.io');

// app.listen(3000);

// var io = require('socket.io')(app);

let server = http.createServer((req, res) => {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

server.listen(8080);

let socket = io.listen(server);

socket.on('connection', function (socket) {
    console.log('connected!');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});