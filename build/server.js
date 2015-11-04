'use strict';
var WebSocket = require('ws');
var models = require('./models');

var port = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });

server.on('connection', function (ws) {
    console.log("Connection made")
    ws.on('message', function (message) {
        try  {
            //var userMessage = new models.UserMessage(message);
            var uMessage = JSON.parse(message)
            broadcast(JSON.stringify(uMessage));
        } catch (e) {
            console.error(e.message);
        }
    });
});

function broadcast(data) {
    var i = 0;
    server.clients.forEach(function (client) {
        console.log("Sending message No: " + ++i);
        client.send(data);
    });
}
;

console.log('Server is running on port ', port);
