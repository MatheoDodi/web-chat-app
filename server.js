const express = require('express');
const app = express();
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var connections = [];

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    connections.push(socket);
    console.log(connections.length);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('user disconnected');
  })

  socket.on('send message', (data) => {
      io.sockets.emit('new message', {msg: data});
  } )
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
