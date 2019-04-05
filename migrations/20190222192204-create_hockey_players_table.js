module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hockey_players', {
      hockey_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      socio_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        unique: true
      },
      tira: {
        type: Sequelize.ENUM('Damas', 'Caballeros'),
        allowNull: false
      },
      categoria_h: {
        type: Sequelize.ENUM('Mayores', 'Quinta', 'Sexta', 'Septima', 'Octava', 'Novena', 'Decima', 'Escuelita'),
        allowNull: false
      },
      num_fichaje: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      num_camiseta: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true
      },
      beca: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        defaultValue: '0'
      },
      fecha_alta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fecha_baja: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Hockey_players')
  }
}
