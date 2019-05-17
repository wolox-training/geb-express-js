const { ApolloServer, gql } = require('apollo-server');
const albums = require('./albums');

const typeDef = gql`
  type Query
`;

module.exports = new ApolloServer({
  typeDefs: [typeDef, albums.typeDef],
  resolvers: [albums.resolvers]
});
