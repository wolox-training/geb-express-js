const users = require('../models').users,
  sessionManager = require('./../services/sessionManager'),
  errors = require('../errors'),
  ADMIN_ROLE = 'admin';

exports.checkRole = (req, res, next) => {
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
