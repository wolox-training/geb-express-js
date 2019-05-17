const { albums: Albums } = require('./../../models');

const resolvers = {
  Query: {
    albums: () => Albums.findAll()
  }
};

module.exports = {
  resolvers
};
