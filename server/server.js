const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();

// Need to use CORS middleware during development
// so that our socket server (on port 3001) can communicate
// with our front-end (on port 3000) without throwing an error.
// This is not necessary in production, since the front-end
// will be served by Express on the same port as the back-end.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
} else {
  app.use(cors());
}

// connect to mongoDB database
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/board-of-the-rings")

// This time, we actually need to use the HTTP server instance that is
// returned by 'app.listen', so we capture it in a 'server' variable.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🧩`)
});

// Here we attach the socket.io server object (which will listen for socket events)
// to the HTTP server created by Express in the previous block.
// Again, need to set up CORS for a development environment.
const io = (process.env.NODE_ENV === 'production') 
? 
new Server(server)
:
new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Listen for socket events.
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", async (data) => {
    await socket.join(data.roomId);
    socket.data.playerName = data.playerName;
    socket.data.isHost = data.isHost;
    const roommateSockets = await io.in(data.roomId).fetchSockets();
    const players = [];
    for (roommate of roommateSockets) {
      players.push({
        id: roommate.id,
        name: roommate.data.playerName,
        isHost: roommate.data.isHost
      });
    }
    console.log(`User ${socket.data.playerName} (${socket.id}) joined room ${data.roomId}.`);
    console.log(players.length);
    io.sockets.in(data.roomId).emit('receive_current_players',players);
  });

  socket.on("leave_room", async (data) => {
    await socket.leave(data);
    const roommateSockets = await io.in(data.roomId).fetchSockets();
    const players = [];
    for (roommate of roommateSockets) {
      players.push({
        id: roommate.id,
        name: roommate.data.playerName
      });
    }
    console.log(`User ${socket.data.playerName} (${socket.id}) left room ${data}.`);
    console.log(players.length);
    io.sockets.in(data).emit('receive_current_players',players);
  });

  socket.on("host_left", (room) => {
    socket.to(room).emit('receive_host_left');
  });

  socket.on("start_game", (room) => {
    io.sockets.in(room).emit('receive_start_game');
  });

  socket.on("advance_turn", (room) => {
    io.sockets.in(room).emit('receive_advance_turn');
  });
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  })

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected - ${reason}`);
  });
});