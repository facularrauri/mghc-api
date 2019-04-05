const Sequelize = require('sequelize')

const guemes = new Sequelize('guemes', 'root', '37819027Ff', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false
})

guemes
  .authenticate()
  .then(() => {
    console.log('Coneccion a la base de datos establecida Correctamente!')
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err)
  })

module.exports = guemes
global.sequelize = guemes
