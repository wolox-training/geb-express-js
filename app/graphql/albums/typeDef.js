const { gql } = require('apollo-server');

const typeDef = gql`
  type Albums {
    ownedBy: String
    album: String
    albumId: Int
  }

  extend type Query {
    albums: [Albums]
  }
`;

module.exports = {
  typeDef
};
