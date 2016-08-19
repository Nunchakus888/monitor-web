/**
 * Created by Roidder on 2016/8/18.
 */
/*
 var express = require('express');
 var app = express();
 app.use(express.static('./www/'));
 app.listen(9999, 'localhost');*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var dateFormat = require('../lib/DateFormat.js')
var port = process.env.PORT || 8888;
console.log(new dateFormat());
io.on('connection', function (socket) {
    console.log('a user connected');

    //监听客户端请求
    socket.on('requestApi', function (obj) {
        console.log(obj);
        /*        if(!onlineUsers.hasOwnProperty(obj.userid)) {
         onlineUsers[obj.userid] = obj.username;
         //在线人数+1
         onlineCount++;
         }*/
        var apiDate = [];
        setInterval(function () {
            apiDate.push([DF.format(new Date(), 'HH:mm:ss.zzz') + '<br/>用户:' + Math.abs(~~(Math.random() * 100)), ~~(Math.random() * 1000)])
            io.emit('requestApi', {date: apiDate});
        }, 1000);
    });

});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('./www'));
