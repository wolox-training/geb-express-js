const users = require('../models').users,
  sessions = require('../models').sessions,
  helpers = require('../helpers'),
  sessionManager = require('./../services/sessionManager'),
  errors = require('../errors'),
  ADMIN_ROLE = 'admin';

exports.checkSession = (req, res, next) =>
  sessions
    .find(req.user.email, req.decoded.payload.time)
    .then(u => {
      next();
    })
    .catch(err => {
      return next(errors.forbiddenAction());
    });

exports.checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !sessionManager.verify(token)) return next(errors.invalidAuth());
  const decoded = sessionManager.decode(token);
  users.findUser(decoded.payload.user).then(u => {
    if (u) {
      req.user = u;
      req.decoded = decoded;
      next();
    } else {
      res.status(401);
      res.end();
    }
  });
};

exports.checkRoleOrId = (req, res, next) => {
  const targetId = req.params.user_id,
    user = req.user;
  if (helpers.checksId(user.id, targetId) || helpers.isAdmin(user.role)) {
    req.targetId = targetId;
    next();
  } else return next(errors.invalidEntry());
};
