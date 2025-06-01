'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('carrinho_fotos', 'dtinclusao', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.addColumn('carrinho_fotos', 'dtalteracao', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('carrinho_fotos', 'dtalteracao');
    await queryInterface.removeColumn('carrinho_fotos', 'dtinclusao');
  }
};