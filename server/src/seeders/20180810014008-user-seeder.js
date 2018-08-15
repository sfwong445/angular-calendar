'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'))

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        id: 1,
        Username: 'Username',
        Password: await bcrypt.hash('saranghae528',10),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        Username: 'administrator',
        Password: await bcrypt.hash('KoreaNz', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        Username: 'admin',
        Password: await bcrypt.hash('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
