const sequelize = require('sequelize')
const guemes = require('../db/dbConnect')

const user = guemes.define('User', {
  user_id: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
})

module.exports = user
