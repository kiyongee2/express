// const { Sequelize } = require(".");

const User = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userid: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      pw: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      tableName: 'user2',
      timestamps: false
    }
  )
  return model;
}

module.exports = User