'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'))

async function hashPassword(user) {
  const SALT_FACTOR = 10;

  if (!user.changed('Password'))  {
    return
  } 
  const hash = await bcrypt.hash(user.Password, SALT_FACTOR)
  return user.setDataValue('Password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Username: {
      type: DataTypes.STRING,
      unique: true
    },
    Password: DataTypes.STRING
  }, {
    hooks: {
      beforeBulkCreate: (user, options) => hashPassword(user),
      beforeCreate: (user, options) => hashPassword(user),
      beforeUpdate: (user, options) => hashPassword(user),
      beforeSave: (user, options) => hashPassword(user),
      afterBulkUpdate: (user, options) => hashPassword(user)
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Appointments)
  };
  return User;
};