const Sequelize = require('sequelize')
const guemes = require('../db/dbConnect')

const socio = guemes.define('Socio', {
  socio_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('Activo Mayor','Activo Cadete','Menor','Vitalicio','Honorario','Licencia','Baja'),
    allowNull: true
  },
  mail: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  dni: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false
  },
  telcel: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  telpar: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  telmadre: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  telpadre: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  direccion: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  nacimiento: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  fechaalta: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  fechabaja: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  obrasocial: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  numobrasocial: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true
  },
  act_hockey: {
    type: Sequelize.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Inactivo'
  },
  act_futbol: {
    type: Sequelize.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Inactivo'
  },
  licenciainicio: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  licenciafin: {
    type: Sequelize.DATEONLY,
    allowNull: true
  }
})

module.exports = socio
