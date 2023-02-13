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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/board-of-the-rings")

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

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  })
});