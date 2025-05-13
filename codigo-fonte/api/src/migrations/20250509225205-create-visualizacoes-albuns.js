'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visualizacoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      album_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'albuns',
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

    await queryInterface.addConstraint('visualizacoes', {
      fields: ['album_id', 'ip_usuario'],
      type: 'unique',
      name: 'visualizacao_unica_album_por_ip'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('visualizacoes');
  }
};