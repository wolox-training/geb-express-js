const bcrypt = require('bcryptjs'),
  users = require('../app/models').users;

exports.execute = () => {
  return bcrypt
    .hash('password28', 10)
    .then(hash => {
      users.newUser({
        firstName: 'john',
        lastName: 'doe',
        email: 'johndoe@wolox.com.ar',
        password: hash
      });
    })
    .catch(err => {
      throw err;
    });
};
