'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Appointments', [{
        UserId: 1,
        title: 'Hello1',
        date: new Date(2018,0,1),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        UserId: 1,
        title: 'Hello2',
        date: new Date(2018,1,1),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        UserId: 1,
        title: 'Hello3',
        date: new Date(2018,2,1),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Appointments', null, {});
  }
};
