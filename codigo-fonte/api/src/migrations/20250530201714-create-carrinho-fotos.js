'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CarrinhoFotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carrinho_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Carrinho',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'detalhe_evento', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('CarrinhoFotos');
  }
};
