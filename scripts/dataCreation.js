const bcrypt = require('bcryptjs'),
  users = require('../app/models').users,
  albums = require('../app/models').albums;

exports.execute = () => {
  return bcrypt
    .hash('password28', 10)
    .then(hash => {
      const data = [
        users.newUser({
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@wolox.com.ar',
          password: hash,
          role: 'admin'
        }),
        users.newUser({
          firstName: 'juan',
          lastName: 'notdoe',
          email: 'juandoe@wolox.com.ar',
          password: hash,
          role: 'user'
        }),
        users.newUser({
          firstName: 'john',
          lastName: 'doe',
          email: 'johndoe@wolox.com.ar',
          password: hash,
          role: 'user'
        }),
        users.newUser({
          firstName: 'john two',
          lastName: 'doe',
          email: 'johndoe2@wolox.com.ar',
          password: hash,
          role: 'user'
        }),
        users.newUser({
          firstName: 'john three',
          lastName: 'doe',
          email: 'johndoe3@wolox.com.ar',
          password: hash,
          role: 'user'
        }),
        users.newUser({
          firstName: 'john four',
          lastName: 'to the floor',
          email: 'johndoe4@wolox.com.ar',
          password: hash,
          role: 'user'
        }),
        albums.newEntry({
          ownedBy: 'juandoe@wolox.com.ar',
          album: 'quidem molestiae enim',
          albumId: '1'
        }),
        albums.newEntry({
          ownedBy: 'juandoe@wolox.com.ar',
          album: 'molestiae enim',
          albumId: '3'
        }),
        albums.newEntry({
          ownedBy: 'admin@wolox.com.ar',
          album: 'quidem molestiae enim',
          albumId: '1'
        })
      ];
      return Promise.all(data);
    })
    .catch(err => {
      throw err;
    });
};
