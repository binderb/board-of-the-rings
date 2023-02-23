const { AuthenticationError } = require("apollo-server-express");
const { Questions, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //me query tells us who the logged in user is
    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    //queries all users
    users: async () => {
      return User.find().select("-__v -password");
    },
    //queries a single user
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },
    //queries all questions
    questions: async () => {
      return Questions.find();
    }
  },

  Mutation: {
    //add a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //log in an existing user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    //increments player's wins total if they meet the win condition for the game
    updateMyWins: async (parent, args, context) => {
      if (context.user._id) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $inc: { wins: 1} },
          { new: true }
        );
        return updatedUser;
      }
    },
    //replaces username with a new one from user input
    updateUsername: async (parent, { username }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { username: username },
          { new: true }
        );
        const token = signToken(updatedUser);
        return { updatedUser, token };
      }
    },
    //replaces display name with a new one from user input
    updateDisplayName: async (parent, { displayName }, context) => {
      if (context.user) {
        const updatedDisplayName = await User.findOneAndUpdate(
          { _id: context.user._id },
          { displayName: displayName },
          { new: true }
        );
        const token = signToken(updatedDisplayName);
        return { updatedDisplayName, token };
      }
    },
    //removes user from database
    removeUser: async (parent, args, context) => {
      if (context) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
    }
  }
};

module.exports = resolvers;
