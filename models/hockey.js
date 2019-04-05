const sequelize = require('sequelize')
const guemes = require('../db/dbConnect')

const hockey = guemes.define('Hockey_player', {
  hockey_id: {
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
  tira: {
    type: sequelize.ENUM('Damas', 'Caballeros'),
    allowNull: false
  },
  categoria_h: {
    type: sequelize.ENUM('Mayores', 'Quinta', 'Sexta', 'Septima', 'Octava', 'Novena', 'Decima', 'Escuelita'),
    allowNull: false
  },
  num_fichaje: {
    type: sequelize.STRING(100),
    allowNull: true
  },
  num_camiseta: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  beca: {
    type: sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    defaultValue: '0'
  },
  fecha_alta: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  fecha_baja: {
    type: sequelize.DATE,
    allowNull: true
  }
})

module.exports = hockey
