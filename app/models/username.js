const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const Username = sequelize.define(
    'Username',
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
  Username.associate = function(models) {
    // associations can be defined here
  };
  return Username;
};
