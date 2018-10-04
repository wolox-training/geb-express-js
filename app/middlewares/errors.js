const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.INVALID_USERNAME]: 400,
  [errors.INVALID_EMAIL]: 400,
  [errors.INVALID_PASSWORD]: 400,
  [errors.INVALID_SIGNUP]: 400,
  [errors.USER_ALREADY_EXISTS]: 422,
  [errors.DEFAULT_DATABASE_ERROR]: 500,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
