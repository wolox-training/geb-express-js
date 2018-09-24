const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  logger = require('../logger'),
  errors = require('../errors'),
  isAlphanumeric = require('is-isalphanumeric');


exports.signUp = (req, res, next) => {
  const saltRounds = 5;
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  if (
    EMAIL_REGEX.test(user.email) &&
    (user.email.endsWith('@wolox.com.ar') ||
      user.email.endsWith('@wolox.co') ||
      user.email.endsWith('@wolox.cl'))
  ) {
    if (isAlphanumeric(req.body.password) && req.body.password.length >= 8) {
      bcrypt.hash(user.password, saltRounds).then(hash => {
        user.password = hash;
        users
          .newUser(user)
          .then(u => {
            logger.info('User created correctly');
            res.status(200);
            res.end();
          })
          .catch(next);
      });
    } else {
      next(errors.invalidPassword());
    }
  } else {
    next(errors.invalidEmail());
  }
};
