'use strict';
var WebSocket = require('ws');
var models = require('./models');
//declare port variable
var port = process.env.PORT || 5050;
var WebSocketServer = WebSocket.Server
, wss = new WebSocketServer({host:'10.0.2.15', port:port});
//declare variable to increment as clients are added
var sid = 0;
wss.on('connection', function (ws) {
	sid = sid+1;
    console.log("Connection made by Client No.: "+ sid)
    ws.on('message', function (message) {
        try  {
            //parse incoming message
		//var uMessage = JSON.parse(message)
		//var mName = uMessage.name;
       	 	//var mMsg = uMessage.message;
		//create new json object and add sid
       	 	//var jMessage = {"sid": sid, "name": mName, "message": mMsg};
       	 	//wss.broadcast(JSON.stringify(jMessage));
		wss.broadcast(message);
        } catch (e) {
            console.error(e.message);
        }
    });
    ws.on('close', function() {
            console.log((new Date()) + ws.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            //clients.splice(index, 1);
            // push back user's color to be reused by another user
            //colors.push(userColor);
        //}
    });

});

wss.broadcast = function broadcast(data) {
  var i = 0;
  wss.clients.forEach(function each(client) {
   // console.log("Sending message No: " + ++i);
    client.send(data);
  });
};


console.log('Server is running on port ', port);
