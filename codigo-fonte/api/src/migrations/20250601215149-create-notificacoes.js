'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notificacoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      topico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      acao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      local_acao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      foiVisualizado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notificacoes');
  },
};
