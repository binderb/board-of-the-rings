const path = require('path');
const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { Server: SocketIOServer } = require('socket.io');
const registerGameHandlers = require('./utils/gameHandlers');
const cors = require('cors');
const db = require('./config/connection');

// -------------------------------
// Basic Express Setup
// -------------------------------

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Rather than using "app.listen" (which returns an HttpServer object),
// we create one explicitly here, and can use "server.listen" later
// to start the server.
const server = http.createServer(app);

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

// -------------------------------
// Socket.io Setup
// -------------------------------

// Create a new socket.io server instance (which will listen for socket events).
// Again, need to set up CORS for a development environment.
const io = (process.env.NODE_ENV === 'production') 
? 
new SocketIOServer(server)
:
new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Register socket events to listen for.
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  registerGameHandlers(io, socket);
});

// -------------------------------
// Apollo Server Setup
// -------------------------------

// Create an Apollo server instance.
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware
});

// -------------------------------
// Starting the server
// -------------------------------

const startServer = async () => {
  await apollo.start();
  apollo.applyMiddleware({ app });

  db.once('open', () => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}! 🧩`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apollo.graphqlPath}`);
    })
  })
};

// Start the server.
startServer();