const users = require('../models').users,
  errors = require('../errors'),
  ADMIN_ROLE = 'admin';

exports.checkRole = role => {
  const messages = [];
  if (role !== ADMIN_ROLE) messages.push(errors.FORBIDDEN_ACTION);
  return messages;
};
