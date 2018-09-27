const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors');

exports.signUp = (req, res, next) => {
  const saltRounds = 5;
  const errs = [];

  helpers.validateEmail(req.body.email, errs);
  helpers.validatePassword(req.body.password, errs);

  if (errs.length) {
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
