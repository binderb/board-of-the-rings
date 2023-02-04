const express = require('express');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const app = express();


// This time, we actually need to use the HTTP server instance that is
// returned by 'app.listen', so we capture it in a 'server' variable.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🧩`)
});