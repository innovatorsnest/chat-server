var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection' ,function(socket){

    socket.on('disconnected', function(){
        io.emit('users-changed', {user: socket.nickname, event: 'left'});
    })

    socket.on('set-nickname', function(nickname){
        socket.nickname = nickname;
        io.emit('users-changed', {user: nickname, event: 'joined'});
    })


    socket.on('add-message', function(message){
        io.emit('message', {text: message.text , from: socket.nickname, created: new Date()});
    })
})


var port = process.env.PORT || 3001;

http.listen(port , function(){
    console.log('Server listening on Port' + port);
})