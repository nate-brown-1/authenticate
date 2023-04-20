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

  model.authenticateBasic = async function (username, password) {
    const receivedUser = await this.findOne({ where: { username } });
    if (receivedUser) { console.log('user found') }
    else { console.error('user not found'); }
    const valid = await bcrypt.compare(password, receivedUser.password);
    if (valid) { return receivedUser; }
    else {
      throw new Error('Invalid User');
    }
  };

  return model;

};

module.exports = userModel;
