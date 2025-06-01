'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('compras', 'carrinho_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'carrinho',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('compras', 'carrinho_id');
  }
};
