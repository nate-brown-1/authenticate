// bcrypt for hashing passwords
const bcrypt = require('bcrypt');

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  model.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return model;

};

module.exports = userModel;
