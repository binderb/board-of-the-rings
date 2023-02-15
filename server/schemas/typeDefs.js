const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Placeholder {
    _id: ID
  }

  type Query {
    placeholder: Placeholder
  }
`;

module.exports = typeDefs;