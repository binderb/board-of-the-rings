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
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

// answers: [{String}, {Boolean}]
