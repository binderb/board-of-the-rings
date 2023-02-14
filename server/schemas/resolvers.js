const resolvers = {
  Query: {
    placeholder: async () => {
      return {
        _id: "placeholder ID"
      };
    }
  }
}

module.exports = resolvers;