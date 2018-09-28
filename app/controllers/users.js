const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors');

exports.signUp = (req, res, next) => {
  const saltRounds = 5;
<<<<<<< 09bef0e6632521d24cfee84937f43ac1cbf89364
<<<<<<< fbc1b74de642cb9727a9b25334e10ead7f9a52c9
<<<<<<< 04a658338da54caff107df2d95323f47c7e68fa7
<<<<<<< 2fdf40e70de7a7664a8ed5fef4610d1588d2e0c7
<<<<<<< 72de4844d3f7e8865090cbce8f9c87d7c48dc210
<<<<<<< 747066e5874edef1326a42baa4b2de28b1a5d574
=======
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
>>>>>>> made my branch to track the signup_tests
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

<<<<<<< 747066e5874edef1326a42baa4b2de28b1a5d574
  helpers
    .validateEmailPassword(user.email, user.password)
    .then(pwd => {
      return bcrypt.hash(pwd, saltRounds).then(hash => {
        user.password = hash;
        return users.newUser(user).then(u => {
          logger.info('User created correctly.');
          res.status(200);
          res.end();
        });
=======
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
>>>>>>> made my branch to track the signup_tests
=======
  const signErrors = [];

=======
  const signErrors = [];

>>>>>>> Fixed requested changes
  if (!helpers.validatePassword(req.body.password)) signErrors.push(errors.invalidPassword());
  if (!helpers.validateEmail(req.body.email)) signErrors.push(errors.invalidEmail());
  console.log('Lenght es' + signErrors.length);
  if (signErrors.length) {
    throw signErrors;
=======
  const errs = [];
=======
=======
>>>>>>> fixed the branch with the previous pr and some typos
  let errs = [];
>>>>>>> fixed requested changes

  errs.push(helpers.validateEmail(req.body.email));
  errs.push(helpers.validatePassword(req.body.password));

  errs = errs.filter(function(err) {
    return err !== undefined;
  });

  if (errs.length) {
    next(errors.invalidSignup(errs));
<<<<<<< 09bef0e6632521d24cfee84937f43ac1cbf89364
>>>>>>> fixed req changes
=======
>>>>>>> fixed the branch with the previous pr and some typos
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
<<<<<<< 09bef0e6632521d24cfee84937f43ac1cbf89364
      return users.newUser(user).then(u => {
        console.log(u);
=======

      return users.newUser(user).then(u => {
>>>>>>> fixed the branch with the previous pr and some typos
        logger.info('User created correctly.');
        res.status(200);
        res.end();
<<<<<<< 2fdf40e70de7a7664a8ed5fef4610d1588d2e0c7
>>>>>>> made some fixes, duplicate user still wont pass
=======
>>>>>>> Fixed requested changes
      });
    })
    .catch(err => {
      logger.info('Error');
      next(err);
    });
};
