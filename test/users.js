const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  should = chai.should();

describe('users', () => {
  describe('/users POST', () => {
    it('should create user with no problems', () => {
      return chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@wolox.com.ar',
          password: 'johndoepassword'
        })
        .then(res => {
          res.should.have.status(200);
          dictum.chai(res);
        });
    });

    it('should fail, email already in use', () => {
      return chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@wolox.com.ar',
          password: 'johndoepassword'
        })
        .catch(err => {
          err.should.have.status(422);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        });
    });

    it('should fail, missing field', () => {
      return chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          password: 'johndoepassword28'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        });
    });

    it('should fail, email not valid', () => {
      return chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@imjohndoe.com',
          password: 'johndoepassword28'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        });
    });

    it('should fail, password not alphanumeric', () => {
      return chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@wolox.com.ar',
          password: 'johndoe'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        });
    });
  });
});
