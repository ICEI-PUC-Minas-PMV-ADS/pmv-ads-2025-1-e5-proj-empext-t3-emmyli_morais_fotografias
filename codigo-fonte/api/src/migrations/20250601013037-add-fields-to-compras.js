'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('compras', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('compras', 'total', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });

    await queryInterface.addColumn('compras', 'status', {
      type: Sequelize.ENUM(
        'pending',
        'approved',
        'authorized',
        'in_process',
        'in_mediation',
        'rejected',
        'cancelled',
        'refunded',
        'charged_back'
      ),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('compras', 'descricao');
    await queryInterface.removeColumn('compras', 'total');
    await queryInterface.removeColumn('compras', 'status');
  }
};
