'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('marca_dagua', 'imagem', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('marca_dagua', 'imagem', {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    });
  }
};
