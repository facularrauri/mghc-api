const sequelize = require('sequelize')
const guemes = require('../db/dbConnect')

const futbol = guemes.define('Futbol_player', {
  futbol_id: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  socio_id: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    unique: true
  },
  categoria_f: {
    type: sequelize.ENUM('Sub15', 'Sub11', 'Sub9', 'Jardin'),
    allowNull: false
  },
  num_camisetaf: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  becaf: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    defaultValue: '0'
  },
  fecha_altaf: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  fecha_bajaf: {
    type: sequelize.DATE,
    allowNull: true
  }
})

module.exports = futbol
