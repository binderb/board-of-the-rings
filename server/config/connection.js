const mongoose = require("mongoose");

//sets up mongoose connection for app
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/board-of-the-rings',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;