'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'john',
      password: "$2b$10$tV4PJXvwEwKjCSIVpiQF7.Pjyg5Sy.aihdlL8YT6E2FOKck59.Dhe",
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'maxi',
      password: "$2b$10$tV4PJXvwEwKjCSIVpiQF7.Pjyg5Sy.aihdlL8YT6E2FOKck59.Dhe",
      email: 'maxi@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'david',
      password: "$2b$10$tV4PJXvwEwKjCSIVpiQF7.Pjyg5Sy.aihdlL8YT6E2FOKck59.Dhe",
      email: 'devid@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
