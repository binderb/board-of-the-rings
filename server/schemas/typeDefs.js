const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Answer {
    option: String
    isCorrect: Boolean
  }
  type Questions {
    _id: ID
    quizQ: String
    answers: [Answer]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    displayName: String!
    wins: Int!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    questions: [Questions]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, displayName: String!, password: String!): Auth
    updateMyWins: User
    updateUsername(username: String!): Auth
    updateDisplayName(displayName: String!): Auth
    removeUser(_id: ID!): User
  }
`;

module.exports = typeDefs;


