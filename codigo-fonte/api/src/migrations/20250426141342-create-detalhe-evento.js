'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detalhe_evento', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'eventos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      foto: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tem_marca_agua: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      ordem: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('detalhe_evento');
  }
};
