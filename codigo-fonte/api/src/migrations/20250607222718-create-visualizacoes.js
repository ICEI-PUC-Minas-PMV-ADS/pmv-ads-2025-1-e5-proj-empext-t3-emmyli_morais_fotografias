'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('visualizacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'eventos', key: 'id' },
        onDelete: 'CASCADE'
      },
      ip_usuario: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      dtinclusao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('visualizacoes');
  }
};
