'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1) Se existir constraint de FK, remova-a
    await queryInterface.removeConstraint('produto', 'fk_produto_eventos').catch(() => {});

    // 2) Remova a coluna id_evento
    await queryInterface.removeColumn('produto', 'id_evento').catch(() => {});
  },

  down: async (queryInterface, Sequelize) => {
    // Caso queira reverter, adiciona de volta sem FK.
    await queryInterface.addColumn('produto', 'id_evento', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
