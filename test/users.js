const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  should = chai.should();

describe('users', () => {
  describe('/users GET', () => {
    it('should fail, headers are not sent', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe3@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users')
            .catch(err => err.should.have.status(401));
        });
    });

    it('should make offset be bigger than all records atm', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users?page=2')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.should.be.json;
              res.body.length.should.equal(0);
              res.should.have.status(200);
            });
        });
    });

    it('should get limited data w/ offset', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users?limit=2')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body.length.should.equal(2);
              res.should.have.status(200);
            });
        });
    });

    it('should get all data default limit value and no offset', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.should.be.json;
              res.should.have.status(200);
            });
        });
    });
  });

  describe('/users/sessions POST', () => {
    it('should login ok', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({
          email: 'juandoe@wolox.com.ar',
          password: 'password28'
        })
        .then(res => {
          res.should.have.status(200);
          res.headers.should.have.property(sessionManager.HEADER);
          dictum.chai(res);
        });
    });

    it('should not log with wrong password', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({
          email: 'almostjohndoe@wolox.com.ar',
          password: 'johndoepassword'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        });
    });
    it('should not log with wrong email', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({
          email: 'almostjohndoe@wolox.com.ar',
          password: 'johndoepassword'
        })
        .catch(err => {
          err.should.have.status(400);
          err.response.should.be.json;
          err.response.body.should.have.property('message');
          err.response.body.should.have.property('internal_code');
        });
    });
  });

  describe('/users POST', () => {
    it('should create user with no problems', () => {
      return chai
        .request(server)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'notjohndoe@wolox.com.ar',
          password: 'johndoepasswor44d'
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
          password: 'johndoepassword22'
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
          email: 'johnwithnolastname@wolox.co',
          password: 'johndoepassword28'
        })
        .catch(err => {
          err.should.have.status(500);
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
