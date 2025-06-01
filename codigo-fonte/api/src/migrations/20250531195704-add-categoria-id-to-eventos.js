'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('eventos', 'categoria_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('eventos', 'categoria_id');
  }
};
