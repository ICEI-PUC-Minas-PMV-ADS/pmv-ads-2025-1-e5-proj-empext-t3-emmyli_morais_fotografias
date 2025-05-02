'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produto', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      descricao: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      quantidade_fotos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      id_evento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'eventos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      dtalteracao: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('produto');
  }
};
