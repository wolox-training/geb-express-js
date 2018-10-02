const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors'),
  sessionManager = require('../services/sessionManager');

exports.logIn = (req, res, next) => {
  return users
    .findUser(req.body.email)
    .then(u => {
      if (u) {
        return bcrypt.compare(req.body.password, u.password).then(valid => {
          if (valid) {
            const token = sessionManager.encode({ user: u.username });
            res.set(sessionManager.HEADER, token);
            res.status(200);
            res.end();
          } else next(errors.invalidPassword());
        });
      } else next(errors.invalidUsername());
    })
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });
};

exports.signUp = (req, res, next) => {
  const saltRounds = 5;
  const errs = [];

  errs.push(helpers.validateEmail(req.body.email));
  errs.push(helpers.validatePassword(req.body.password));

  const messages = errs.filter(err => err !== '');

  if (messages.length) {
    next(errors.invalidSignup(errs));
  }

  return bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash => {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      };

      return users.newUser(user).then(u => {
        logger.info('User created correctly.');
        res.status(200);
        res.end();
      });
    })
    .catch(err => {
      logger.info('Error');
      next(err);
    });
};
