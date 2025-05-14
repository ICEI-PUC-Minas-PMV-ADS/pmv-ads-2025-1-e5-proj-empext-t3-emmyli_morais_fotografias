'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('curtidas_foto', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'detalhe_evento',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      ip_usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addConstraint('curtidas_foto', {
      fields: ['id_foto', 'ip_usuario'],
      type: 'unique',
      name: 'curtida_unica_foto_por_ip'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('curtidas_foto');
  }
};