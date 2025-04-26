'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT
      },
      data_evento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora_evento: {
        type: Sequelize.TIME
      },
      local: {
        type: Sequelize.STRING(255)
      },
      publico: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dtalteracao: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventos');
  }
};
