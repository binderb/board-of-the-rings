const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Questions {
    _id: ID
    quizQ: String
    answers: [{String}, {Boolean}]
  }

  type Query {
    questions: [Questions]!
    question:(profileId: ID!): Questions
  }
  `;

module.exports = typeDefs;