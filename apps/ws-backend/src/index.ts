import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on('connection', function connection(ws) {
    console.log("Client connected");
    console.log(ws);
    ws.on('message', function message(data) {
        console.log(data);
        ws.send('pong');
    });
});