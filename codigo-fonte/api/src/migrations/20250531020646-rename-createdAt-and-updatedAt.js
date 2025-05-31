'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('carrinho', 'updatedAt', 'dtalteracao');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('carrinho', 'dtalteracao', 'updatedAt');
  }
};
