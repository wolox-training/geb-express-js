const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors');

exports.signUp = (req, res, next) => {
  const saltRounds = 5;
<<<<<<< HEAD
  let errs = [];

  errs.push(helpers.validateEmail(req.body.email));
  errs.push(helpers.validatePassword(req.body.password));

  errs = errs.filter(function(err) {
    return err !== undefined;
  });

  if (errs.length) {
    next(errors.invalidSignup(errs));
=======
  const signErrors = [];

  if (!helpers.validatePassword(req.body.password)) signErrors.push(errors.invalidPassword());
  if (!helpers.validateEmail(req.body.email)) signErrors.push(errors.invalidEmail());

  if (signErrors.length) {
    throw signErrors;
>>>>>>> e883197e8f4e0a354551e3c22c54d7d0660c411f
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
<<<<<<< HEAD
      return users.newUser(user).then(u => {
        console.log(u);
=======

      return users.newUser(user).then(u => {
>>>>>>> e883197e8f4e0a354551e3c22c54d7d0660c411f
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
