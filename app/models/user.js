const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: false,
      underscored: true
    }
  );

  users.listAll = (page, lim) =>
    users
      .findAll({ attributes: ['firstName', 'lastName', 'email'], limit: lim, offset: (page - 1) * lim })
      .catch(err => {
        throw errors.defaultDatabase(err);
      });

  users.findUser = email =>
    users.findOne({ where: { email } }).catch(err => {
      throw errors.defaultDatabase(err);
    });

  users.newUser = user =>
    users.create(user).catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.userAlreadyExists();
      }
      throw errors.defaultDatabase(err);
    });

  return users;
};
