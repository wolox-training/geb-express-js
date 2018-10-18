const users = require('../models').users,
  errors = require('../errors'),
  sessionManager = require('../services/sessionManager'),
  ADMIN_ROLE = 'admin',
  VALID_ALPHANUM = /^[0-9a-zA-Z]+$/,
  VALID_AR = /^\w+([\.-]?\w+)*@\wolox.com.ar/,
  VALID_CO = /^\w+([\.-]?\w+)*@\wolox.co/,
  VALID_CL = /^\w+([\.-]?\w+)*@\wolox.cl/;

exports.filterPhotos = (albumId, photosList) => {
  const userPhotos = photosList.filter(photo => parseInt(photo.albumId) === albumId);
  return userPhotos;
};

exports.mapEntries = userAlbums =>
  userAlbums.map(entry => ({ ownedBy: entry.ownedBy, album: entry.album, albumId: entry.id }));

exports.isAdmin = role => role === ADMIN_ROLE;

exports.checksId = (userId, targetId) => parseInt(userId) === parseInt(targetId);

exports.validateEmail = email => {
  if (!VALID_AR.test(email) && !VALID_CO.test(email) && !VALID_CL.test(email)) {
    return errors.INVALID_EMAIL;
  } else return '';
};

exports.validatePassword = password => {
  if (!VALID_ALPHANUM.test(password) || password.length < 8) {
    return errors.INVALID_PASSWORD;
  } else return '';
};

exports.validateSign = user => {
  const errs = [];
  errs.push(this.validateEmail(user.email));
  errs.push(this.validatePassword(user.password));
  const messages = errs.filter(err => err !== '');
  return messages;
};
