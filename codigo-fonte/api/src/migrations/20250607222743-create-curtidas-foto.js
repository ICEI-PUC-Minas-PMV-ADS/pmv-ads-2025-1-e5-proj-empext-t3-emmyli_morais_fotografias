'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('curtidas_foto', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'detalhe_evento',  // tabela correta
          key: 'id' 
        },
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

    await queryInterface.addConstraint('curtidas_foto', {
      fields: ['id_foto', 'ip_usuario'],
      type: 'unique',
      name: 'unique_curtida_foto_por_ip'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('curtidas_foto', 'unique_curtida_foto_por_ip');
    await queryInterface.dropTable('curtidas_foto');
  }
};
