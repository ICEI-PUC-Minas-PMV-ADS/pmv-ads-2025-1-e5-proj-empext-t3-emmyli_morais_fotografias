'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('eventos', 'exibirtrabalho', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });

    
    await queryInterface.addColumn('eventos', 'idmarcadagua', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

     await queryInterface.addColumn('eventos', 'urlevento', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

   
    await queryInterface.addConstraint('eventos', {
      fields: ['idmarcadagua'],
      type: 'foreign key',
      name: 'fk_eventos_marcadagua', 
      references: {
        table: 'marca_dagua',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.removeConstraint('eventos', 'fk_eventos_marcadagua');    
    await queryInterface.removeColumn('eventos', 'idmarcadagua');    
    await queryInterface.removeColumn('eventos', 'exibirtrabalho');
    await queryInterface.removeColumn('eventos', 'urlevento');
  }
};