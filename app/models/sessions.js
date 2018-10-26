const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const sessions = sequelize.define(
    'sessions',
    {
      user: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  sessions.associate = function(models) {
    // associations can be defined here
  };

  sessions.add = session =>
    sessions.create(session).catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.userAlreadyExists();
      }
      throw errors.defaultDatabase(err);
    });

  sessions.find = (email, tokenDate) =>
    sessions.findOne({ where: { user: email, date: tokenDate } }).catch(err => {
      throw errors.defaultDatabase(err);
    });

  sessions.delete = email =>
    sessions.destroy({ where: { user: email } }).catch(err => {
      throw errors.defaultDatabase(err);
    });

  return sessions;
};
