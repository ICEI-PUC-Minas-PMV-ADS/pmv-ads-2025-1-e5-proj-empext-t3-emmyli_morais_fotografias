'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Carrinho', 'carrinho');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('carrinho', 'Carrinho');
  }
};
