'use strict';

// bring in the users
const isAlphanumeric = require('is-alphanumeric');
const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  logger = require('../logger'),
  errors = require('../errors');

exports.signUp = (req, res, next) => {
  const saltRounds = 5;
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // so this is my new user-to-be
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  if (
    // first i test the email
    EMAIL_REGEX.test(user.email) &&
    (user.email.endsWith('@wolox.com.ar') ||
      user.email.endsWith('@wolox.co') ||
      user.email.endsWith('@wolox.cl'))
  ) {
    // so then i test if the password is valid
    if (isAlphanumeric(req.body.password) && req.body.password.length >= 8) {
      bcrypt.hash(user.password, saltRounds).then(hash => {
        user.password = hash;
        users
          // if everything went ok i create the new user, in case it fails > catch it afterwards
          .newUser(user)
          .then(u => {
            logger.info('User created correctly');
            res.status(200);
            res.end();
          })
          // Send the error to the handler
          .catch(next);
      });
    } else {
      next(errors.invalidPassword());
    }
  } else {
    next(errors.invalidEmail());
  }
};
