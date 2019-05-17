const chai = require('chai'),
  nock = require('nock'),
  server = require('./../app/graphql'),
  should = chai.should();

const url = `http://localhost:3001/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
  it.only('Returns all albums', () => {
    return request
      .post('/graphql')
      .send({ query: '{ albums{ ownedBy } }' })
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
      });
  });
});
