'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('compras', 'quantidade', {
      type: Sequelize.INTEGER,
      allowNull: true, // mantenha true se quiser continuar permitindo nulo
    });
  },

  down: async (queryInterface, Sequelize) => {
    // rollback: voltar para DECIMAL(10, 2)
    await queryInterface.changeColumn('compras', 'quantidade', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
  },
};
