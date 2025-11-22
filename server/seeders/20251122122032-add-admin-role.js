'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Insert admin role
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        description: 'Administrator with full access',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove seeded roles
    await queryInterface.bulkDelete('Roles', null, {});
  }
};