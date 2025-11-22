'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove the old role column
    await queryInterface.removeColumn('Users', 'role');
  },

  async down (queryInterface, Sequelize) {
    // Restore the role column if needed
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};