module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Futbol_players', {
      futbol_id: {
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
      categoria_f: {
        type: Sequelize.ENUM('Sub15', 'Sub11', 'Sub9', 'Jardin'),
        allowNull: false
      },
      num_camisetaf: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true
      },
      becaf: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        defaultValue: '0'
      },
      fecha_altaf: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fecha_bajaf: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Futbol_players')
  }
}
