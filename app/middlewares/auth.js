const users = require('../models').users,
  helpers = require('../helpers'),
  sessionManager = require('./../services/sessionManager'),
  errors = require('../errors'),
  ADMIN_ROLE = 'admin';

exports.checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !sessionManager.verify(token)) return next(errors.invalidAuth());
  const decoded = sessionManager.decode(token);
  users.findUser(decoded.payload.user).then(u => {
    if (u) {
      req.user = u;
      next();
    } else {
      res.status(401);
      res.end();
    }
  });
};

exports.checkUserAlbums = (req, res, next) => {
  const targetId = req.params.user_id,
    user = req.user;
  if (helpers.checksId(user.id, targetId) || helpers.isAdmin(user.role)) {
    req.targetId = targetId;
    next();
  } else return next(errors.invalidEntry());
};
