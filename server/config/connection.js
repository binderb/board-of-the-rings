const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/board-of-the-rings',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;