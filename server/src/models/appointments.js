'use strict';

module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define('Appointments', {
    title: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Appointments.associate = function(models) {
    // associations can be defined here
    Appointments.belongsTo(models.User)
  };
  return Appointments;
};