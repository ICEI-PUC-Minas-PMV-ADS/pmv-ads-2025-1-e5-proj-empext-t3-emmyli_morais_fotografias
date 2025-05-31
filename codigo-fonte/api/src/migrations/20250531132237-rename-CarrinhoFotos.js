'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CarrinhoFotos', 'carrinho_fotos');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CarrinhoFotos', 'carrinho_fotos');
  }
};
