const users = require('../models').users,
  paginate = require('express-paginate'),
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors'),
  sessionManager = require('../services/sessionManager'),
  LIMIT_DEFAULT = 50,
  OFFSET_DEFAULT = 20;

exports.list = (req, res, next) => {
  const encoded = req.headers.authorization,
    limit = req.query.limit || LIMIT_DEFAULT,
    offset = req.query.offset || OFFSET_DEFAULT;

  if (!encoded || !sessionManager.decode(encoded)) return next(errors.invalidAuth());

  return users
    .listAll(limit, offset)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });
};

exports.logIn = (req, res, next) => {
  return users
    .findUser(req.body.email)
    .then(u => {
      if (!u) return next(errors.invalidUsername());
      return bcrypt.compare(req.body.password, u.password).then(valid => {
        if (!valid) next(errors.invalidPassword());
        const token = sessionManager.encode({ user: u.username });
        res.set(sessionManager.HEADER, token);
        res.send(u);
        res.status(200);
      });
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
    next(errors.invalidSignup(messages));
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
