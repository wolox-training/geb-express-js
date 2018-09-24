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
      paranoid: true,
      underscored: true
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };

<<<<<<< 747066e5874edef1326a42baa4b2de28b1a5d574
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
