const users = require('../models').users,
  helpers = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors'),

exports.signUp = (req, res, next) => {
  const saltRounds = 5;
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  helpers
    .validateEmailPassword(user.email, user.password)
    .then(pwd => {
      return bcrypt.hash(pwd, saltRounds).then(hash => {
        user.password = hash;
        return users.newUser(user).then(u => {
          logger.info('user created correctly');
          res.status(200);
          res.end();
        });
      });
    })
    .catch(err => {
      next(err);
    });
};
