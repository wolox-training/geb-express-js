const users = require('../models').users,
  albums = require('../models').albums,
  paginate = require('express-paginate'),
  bcrypt = require('bcryptjs'),
  helpers = require('../helpers'),
  auth = require('../middlewares/auth'),
  logger = require('../logger'),
  errors = require('../errors'),
  albumsManager = require('../services/albumsManager'),
  sessionManager = require('../services/sessionManager'),
  saltRounds = 5,
  ADMIN_ROLE = 'admin',
  DEFAULT_ROLE = 'user',
  LIMIT_DEFAULT = 50,
  PAGE_DEFAULT = 1;

exports.listPhotos = (req, res, next) =>
  albums
    .findEntryById(req.user.email, req.params.id)
    .then(userAlbum =>
      albumsManager.list(albumsManager.PHOTOS).then(pics => {
        if (!userAlbum && !helpers.isAdmin(req.user.role)) return next(errors.forbiddenAction());
        const userPhotos = helpers.filterPhotos(userAlbum.id, pics);
        res.status(200).send(userPhotos);
      })
    )
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });

exports.listUserAlbums = (req, res, next) =>
  users
    .findUserById(req.targetId)
    .then(target => albums.listEntries(target.email).then(entries => res.status(200).send(entries)))
    .catch(err => {
      logger.info('DB Error');
      next(err);
    });

exports.buyAlbum = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !sessionManager.verify(token)) return next(errors.invalidAuth());
  const decoded = sessionManager.decode(token);

  const owner = decoded.payload.user;
  const albumId = req.params.id;

  albumsManager
    .findAlbum(albumId)
    .then(a => {
      if (!a) return next(errors.invalidAlbum());
      return albums.findEntry(owner, a.title).then(record => {
        if (record) return next(errors.entryAlreadyExists());
        const entry = {
          ownedBy: owner,
          album: a.title,
          albumId: a.id
        };
        return albums
          .newEntry(entry)
          .then(() => {
            res.status(200);
            res.end();
          })
          .catch(err => {
            logger.info('DB Error');
            next(err);
          });
      });
    })
    .catch(err => {
      logger.info('External service error');
      next(err);
    });
};

exports.listAlbums = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !sessionManager.verify(token)) return next(errors.invalidAuth());

  return albumsManager
    .list(albumsManager.ALBUMS)
    .then(list => {
      res.status(200).send(list);
    })
    .catch(err => {
      logger.info('External service error');
      next(err);
    });
};

exports.admin = (req, res, next) => {
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
};

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
};

exports.signUp = (req, res, next) => {
  const messages = helpers.validateSign(req.body);

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
        password: hash,
        role: DEFAULT_ROLE
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
