const { Questions } = require('../models')

const resolvers = {
  Query: {
    questions: async () => {
      return Questions.find();
    }
  }
}

module.exports = resolvers;