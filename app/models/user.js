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

  users.newUser = user => {
    return users.create(user).catch(err => {
      // Filtering every possible error case according to the error msg
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.userAlreadyExists();
      }
      // throw the error to the controller that will use this so it can give it to the handler
      throw errors.defaultDatabase(err);
    });
  };

  return users;
};
