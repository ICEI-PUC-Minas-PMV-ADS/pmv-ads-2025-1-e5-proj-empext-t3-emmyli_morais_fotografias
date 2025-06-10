'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('detalhe_evento', 'focoX', {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 50.00,
      allowNull: false
    });

    await queryInterface.addColumn('detalhe_evento', 'focoY', {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 50.00,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('detalhe_evento', 'focoX');
    await queryInterface.removeColumn('detalhe_evento', 'focoY');
  }
};
