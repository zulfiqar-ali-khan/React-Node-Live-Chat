const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

app.use(cors());
const { Server } = require('socket.io')
const localServer = http.createServer(app);


const io = new Server(localServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {

    console.log("soketck ID", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("user login with id:", data)
    })


    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("rec_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Discounted", socket.io);
    });


});

localServer.listen(3001, () => {
    console.log("server running");
});