const chai = require('chai'),
  nock = require('nock'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  sessionManager = require('./../app/services/sessionManager'),
  should = chai.should(),
  albumsApi = nock('https://jsonplaceholder.typicode.com')
    .persist()
    .get('/albums')
    .reply(200, [
      {
        userId: '1',
        id: '1',
        title: 'quidem molestiae enim'
      },
      {
        userId: '2',
        id: '3',
        title: 'molestiae enim'
      }
    ]),
  photosApi = nock('https://jsonplaceholder.typicode.com')
    .persist()
    .get('/photos')
    .reply(200, [
      {
        albumId: 1,
        id: 302,
        title: 'nihil et ducimus in ipsa perspiciatis',
        url: 'https://via.placeholder.com/600/4e2b80'
      },
      {
        albumId: 1,
        id: 303,
        title: 'minima sit nulla',
        url: 'https://via.placeholder.com/600/2c253f'
      },
      {
        albumId: 1,
        id: 304,
        title: 'animi sit pariatur odio autem consequatur autem amet',
        url: 'https://via.placeholder.com/600/f317f5'
      },
      {
        albumId: 3,
        id: 305,
        title: 'ea rem impedit facilis nobis velit in',
        url: 'https://via.placeholder.com/600/37060d'
      },
      {
        albumId: 3,
        id: 306,
        title: 'impedit aliquid consequatur enim ipsa fugit fugiat dolorem vel',
        url: 'https://via.placeholder.com/600/f8c85b'
      }
    ]);

describe('sessions', () => {
  it('should not expire', () => {
    return chai
      .request(server)
      .post('/users/sessions')
      .send({ email: 'admin@wolox.com.ar', password: 'password28' })
      .then(logged => {
        const expire = chai
          .request(server)
          .get('/albums')
          .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER]);

        return setTimeout(
          () =>
            expire.then(res => {
              res.should.have.status(200);
            }),
          15
        );
      });
  });

  it('should expire', () => {
    return chai
      .request(server)
      .post('/users/sessions')
      .send({ email: 'admin@wolox.com.ar', password: 'password28' })
      .then(logged => {
        const expire = chai
          .request(server)
          .get('/albums')
          .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER]);

        return setTimeout(
          () =>
            expire.catch(err => {
              err.should.have.status(400);
            }),
          15000
        );
      });
  });
});

describe('albums', () => {
  describe('/users/albums/:id/photos', () => {
    it('user should not get photos that does not have', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/albums/1/photos')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .catch(err => {
              err.should.have.status(401);
            });
        });
    });

    it('admin should get its own photos ok', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/albums/1/photos')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body[0].should.have.property('albumId');
              res.body[0].should.have.property('title');
              res.body[0].should.have.property('url');
              res.should.have.status(200);
            });
        });
    });

    it('user should get its own photos ok', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'juandoe@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/albums/1/photos')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body[0].should.have.property('albumId');
              res.body[0].should.have.property('title');
              res.body[0].should.have.property('url');
              res.should.have.status(200);
            });
        });
    });

    it('should not get photos without auth', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/albums/1/photos')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .catch(err => {
              err.should.have.status(401);
            });
        });
    });
  });

  describe('/users/:user_id/albums GET', () => {
    it('user should be able to see its own albums', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'juandoe@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/6/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body[0].ownedBy.should.equal('juandoe@wolox.com.ar');
              res.should.have.status(200);
            });
        });
    });

    it('admin should be able to see its own albums', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/1/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body[0].ownedBy.should.equal('admin@wolox.com.ar');
              res.should.have.status(200);
            });
        });
    });

    it('admin should be able to see others albums', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/6/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body[0].ownedBy.should.equal('juandoe@wolox.com.ar');
              res.should.have.status(200);
            });
        });
    });

    it('user should not be able to see others albums', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/6/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .catch(err => {
              err.should.have.status(400);
            });
        });
    });

    it('should not get albums without auth', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users/6/albums')
            .catch(err => {
              err.should.have.status(401);
            });
        });
    });
  });

  describe('/albums/:id POST', () => {
    it('should be able to buy album', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/albums/1')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.should.have.status(200);
            });
        });
    });

    it('should not be able to buy twice the same album', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/albums/1')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .catch(err => {
              err.should.have.status(401);
            });
        });
    });

    it('should not be able to buy album without auth', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/albums/1')
            .catch(err => {
              err.should.have.status(401);
            });
        });
    });

    it('should not be able to buy invalid album', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/albums/1000')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .catch(err => {
              err.should.have.status(400);
            });
        });
    });
  });

  describe('/albums GET', () => {
    it('should get all albums', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body[0].should.have.property('id');
              res.body[0].should.have.property('title');
              res.should.be.json;
              res.should.have.status(200);
            });
        });
    });

    it('should get all albums, not able to see further information', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.body.should.not.have.property('userId');
              res.should.have.status(200);
            });
        });
    });

    it('should not get list of albums, lacks auth', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe3@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/albums')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .catch(err => {
              err.should.have.status(401);
            });
        });
    });
  });
});

describe('users', () => {
  describe('/users/admin POST', () => {
    it('should not make a new admin with user privileges', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe3@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/users/admin')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .send({
              firstName: 'John',
              lastName: 'admin',
              email: 'johnadmin@wolox.com.ar',
              password: 'password28'
            })
            .catch(isAdmin => {
              isAdmin.should.have.status(401);
            });
        });
    });

    it('should make a new user with admin privileges', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/users/admin')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .send({
              firstName: 'John',
              lastName: 'admin',
              email: 'johnadmin@wolox.com.ar',
              password: 'password28'
            })
            .then(isAdmin => {
              isAdmin.should.have.status(200);
            });
        });
    });

    it('should modify user with admin privileges', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'admin@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .post('/users/admin')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .send({
              firstName: 'Michael',
              lastName: 'admin',
              email: 'johnadmin@wolox.com.ar',
              password: 'password28'
            })
            .then(isAdmin => {
              isAdmin.should.have.status(200);
            });
        });
    });
  });

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

    it('should get all data with offset', () => {
      return chai
        .request(server)
        .post('/users/sessions')
        .send({ email: 'johndoe2@wolox.com.ar', password: 'password28' })
        .then(logged => {
          return chai
            .request(server)
            .get('/users')
            .set(sessionManager.HEADER, logged.headers[sessionManager.HEADER])
            .then(res => {
              res.should.be.json;
              res.body.length.should.equal(6);
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
            .get('/users?limit=2&offset=2')
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
