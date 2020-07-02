const express = require("express")();
const http = require("http").Server(express);
const socketio = require("socket.io")(http);

let position = {
    x: 200,
    y: 200 
};

socketio.on("connection", socket => {
    socket.emit("position", position); //emits only to connected/single client
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                socketio.emit("position", position); //emits for ALL connected users
                break;
            case "right":
                position.x += 5;
                socketio.emit("position", position); //emits for ALL connected users
                break;
            case "up":
                position.y -= 5;
                socketio.emit("position", position); //emits for ALL connected users
                break;
            case "down":
                position.y += 5;
                socketio.emit("position", position); //emits for ALL connected users
                break;
        }
    })
});

http.listen(3000, () => {
    console.log("listening on port 3000");
});