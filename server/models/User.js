const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

//import schemas from other models
//const Schema = require('./');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"]
  },
  password: {
    type: String,
    required: true
  }
});

const User = model("User", userSchema);

module.exports = User;
