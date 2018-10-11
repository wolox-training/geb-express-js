const users = require('../models').users,
  paginate = require('express-paginate'),
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  auth = require('../middlewares/auth'),
  logger = require('../logger'),
  errors = require('../errors'),
  albumsManager = require('../services/albumsManager'),
  sessionManager = require('../services/sessionManager'),
<<<<<<< 2609a30a99971c0f400e9d16f16f6b93f4cbf073
<<<<<<< 00941cf33ee7aebe0280efcfe61f8350d3e6aca4
  LIMIT_DEFAULT = 50,
  PAGE_DEFAULT = 1;
=======
=======
>>>>>>> fixed master merge typo
  saltRounds = 5,
  ADMIN_ROLE = 'admin',
  DEFAULT_ROLE = 'user',
  LIMIT_DEFAULT = 50,
  PAGE_DEFAULT = 1;

exports.albums = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !sessionManager.verify(token)) return next(errors.invalidAuth());

  albumsManager
    .listAlbums()
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(err => {
      logger.info('External service error');
      next(err);
    });
};

exports.admin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !sessionManager.verify(token)) return next(errors.invalidAuth());

  const decoded = sessionManager.decode(token);

  return users
    .findUser(decoded.payload.user)
    .then(u => {
      const privileges = auth.checkRole(u.role);
      if (privileges.length) next(errors.forbiddenAction());

      const messages = helpers.validateSign(req.body);
      if (messages.length) next(errors.invalidSignup(messages));

      return bcrypt.hash(req.body.password, saltRounds).then(hash => {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          role: ADMIN_ROLE
        };

        return users.updateAdmin(user).then(() => {
          logger.info('User role modified correctly.');
          res.status(200);
          res.end();
        });
      });
    })
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });
};
>>>>>>> implemented the admin endpoint, tests missing still

exports.list = (req, res, next) => {
  const encoded = req.headers.authorization,
    limit = req.query.limit || LIMIT_DEFAULT,
    page = req.query.page || PAGE_DEFAULT;

  if (!encoded || !sessionManager.verify(encoded)) return next(errors.invalidAuth());

  return users
    .listAll(page, limit)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });
};

exports.logIn = (req, res, next) => {
<<<<<<< cd30aaf5e93295fce27619ba86593d0d1b340db2
  return users.findUser(req.body.email).then(u => {
    if (u) {
<<<<<<< 1b6510ab333d23b17d7467e8d49016b67ab42d16
      bcrypt
        .compare(req.body.password, u.password)
        .then(valid => {
          if (valid) {
            const token = sessionManager.encode({ user: u.username });
<<<<<<< ab92dab83dedcf2adf54f6515b15815c1e1384ce
            res.set(sessionManager.HEADER,token);
=======
            res.set(sessionManager.HEADER, token);
>>>>>>> pre implementation of the signIn module
            res.status(200);
            res.end();
          } else {
            next(errors.invalidUser());
          }
        })
        .catch(err => {
          console.log(err);
          next(errors.invalidPassword());
        });
    }
=======
      return bcrypt.compare(req.body.password, u.password).then(valid => {
        if (valid) {
          const token = sessionManager.encode({ user: u.username });
          res.set(sessionManager.HEADER, token);
          res.status(200);
          res.end();
        } else next(errors.invalidPassword());
      });
    } else next(errors.invalidUsername());
  }).catch(err =>{
    logger.info('DB Error');
    next(err);
>>>>>>> signIn module w/tests ok
  });
=======
  return users
    .findUser(req.body.email)
    .then(u => {
      if (!u) return next(errors.invalidUsername());
      return bcrypt.compare(req.body.password, u.password).then(valid => {
        if (!valid) next(errors.invalidPassword());
        const token = sessionManager.encode({ user: u.email });
        res.set(sessionManager.HEADER, token);
        res.send(u);
        res.status(200);
      });
    })
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });
>>>>>>> fix typo
};

exports.signUp = (req, res, next) => {
<<<<<<< e6de37e26cb328f7cd2d54a2feea82a6e3b22eef
<<<<<<< 00941cf33ee7aebe0280efcfe61f8350d3e6aca4
  const saltRounds = 5;
<<<<<<< 0c57f48aac77faa2d2bb3a56f05e92848a91ed0c
<<<<<<< 6e94d0fc835c0bb6d44a7def339e4e07d350083d
<<<<<<< b81a53cf95789ad05f09e5e965972393687e6f9e
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
=======
  const errs = [];
>>>>>>> switch let for const
=======
  const errs = [];
>>>>>>> fixed requested changes
=======
=======
>>>>>>> implemented the admin endpoint, tests missing still
  const errs = [];
>>>>>>> implementing signin

  errs.push(helpers.validateEmail(req.body.email));
  errs.push(helpers.validatePassword(req.body.password));

<<<<<<< 0c57f48aac77faa2d2bb3a56f05e92848a91ed0c
<<<<<<< 724b8575dc1f40273641a2daad7faf740bdf33e0
<<<<<<< 6e94d0fc835c0bb6d44a7def339e4e07d350083d
  const messages = errs.filter(function(err) {
    return err !== undefined;
  });
=======
  const messages = errs.filter(err => err !== '');
>>>>>>> fixed requested changes

<<<<<<< b81a53cf95789ad05f09e5e965972393687e6f9e
  if (errs.length) {
=======
  const messages = errs.filter(err => err !== '');

  if (messages.length) {
>>>>>>> implementing signin
    next(errors.invalidSignup(errs));
<<<<<<< 09bef0e6632521d24cfee84937f43ac1cbf89364
>>>>>>> fixed req changes
=======
>>>>>>> fixed the branch with the previous pr and some typos
=======
  if (messages.length) {
    next(errors.invalidSignup(messages));
>>>>>>> switch let for const
=======
  const messages = errs.filter(err => err !== '');
=======
  const messages = helpers.validateSign(req.body);
>>>>>>> admin module done w/ tests

  if (messages.length) {
    next(errors.invalidSignup(messages));
>>>>>>> fixed requested changes
  }

  return bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash => {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: DEFAULT_ROLE
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
