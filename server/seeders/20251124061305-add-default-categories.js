'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Food',
        description: 'Food and groceries',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transport',
        description: 'Travel expenses',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entertainment',
        description: 'Movies and games',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shopping',
        description: 'Clothing and goods',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Health',
        description: 'Medical and fitness',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Utilities',
        description: 'Electricity, water, internet bills',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Education',
        description: 'Courses, books, and training',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Housing',
        description: 'Rent, mortgage, and maintenance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Insurance',
        description: 'Health, car, and life insurance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Personal Care',
        description: 'Haircut, salon, and grooming',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
