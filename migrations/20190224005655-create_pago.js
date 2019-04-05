module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pagos', {
      num_recibo: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      socio_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false
      },
      mes: {
        type: Sequelize.ENUM('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'),
        allowNull: false
      },
      credito: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      debito: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      saldo: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pagos')
  }
}
