const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  should = chai.should();

describe('users', () => {
  describe('/users GET', () => {
    it('should return all data ok', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({
          email: 'notdoe@wolox.com.ar',
          password: 'password28'
        })
        .then(logged => {
          return chai
            .request(server)
            .get('/users')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              console.log(res.body[0]);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body[0].email.should.equal('notdoe@wolox.com.ar');
              res.should.have.status(200);
              dictum.chai(res);
            });
        });
    });
    it('should fail because token is missing', () => {
      return chai
        .request(server)
        .get('/users')
        .catch(err => {
          err.should.have.status(401);
        });
    });
  });

  describe('/users/sessions POST', () => {
    it('should login ok', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({
          email: 'johndoe@wolox.com.ar',
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
