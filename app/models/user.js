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

  users.listAll = (max, start) =>
    users
      .findAll({ attributes: ['firstName', 'lastName', 'email'], limit: max, offset: start })
      .catch(err => {
        throw errors.defaultDatabase(err);
      });

<<<<<<< 9073c1a5d1e6db048476aee7a8b5cb4596542a0e
<<<<<<< 18ef2cd05c0f0ebdf664b694ae2017bb01f88d23
<<<<<<< 747066e5874edef1326a42baa4b2de28b1a5d574
=======
  users.findUser = user => {
    return users.findOne({ where: { email: user } }).catch(err => {
=======
  users.findUser = email =>
    users.findOne({ where: { email } }).catch(err => {
>>>>>>> fixed requested changes
      throw errors.defaultDatabase(err);
    });

>>>>>>> implemeting the signIn module, lacks the token creation
  users.newUser = user =>
    users.create(user).catch(err => {
=======
  users.newUser = user => {
     users.create(user).catch(err => {
>>>>>>> made my branch to track the signup_tests
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.userAlreadyExists();
      }
      throw errors.defaultDatabase(err);
    });

  return users;
};
