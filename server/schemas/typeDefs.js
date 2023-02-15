const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Questions {
    _id: ID
    quizQ: String
    answers: [{String}, {Boolean}]
  }

  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: user
  }

  type Query {
    me: user
    users: [User]
    user(username: String!): User
    questions: [Questions]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    }
  `;

module.exports = typeDefs;
