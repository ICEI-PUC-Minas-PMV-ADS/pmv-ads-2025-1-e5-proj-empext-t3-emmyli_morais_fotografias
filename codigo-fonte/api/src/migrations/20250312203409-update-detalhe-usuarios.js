module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('detalhe_usuarios', 'id'); // Remove a PK antiga
    //await queryInterface.renameColumn('detalhe_usuarios', 'id_usuario', 'idusuario'); // Renomeia a coluna
    await queryInterface.changeColumn('detalhe_usuarios', 'id_usuario', { // Define como nova PK
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('detalhe_usuarios', 'id_usuario', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    //await queryInterface.renameColumn('detalhe_usuarios', 'idusuario', 'id_usuario');
    /*await queryInterface.addColumn('detalhe_usuarios', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    });*/
  }
};
