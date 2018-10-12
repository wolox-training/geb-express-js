'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'role');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'role', Sequelize.STRING);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
