'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('curtidas_album', {
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
        allowNull: false
      },
      dtinclusao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    await queryInterface.addConstraint('curtidas_album', {
      fields: ['evento_id', 'ip_usuario'],
      type: 'unique',
      name: 'unique_curtida_evento_por_ip'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('curtidas_album', 'unique_curtida_evento_por_ip');
    await queryInterface.dropTable('curtidas_album');
  }
};
