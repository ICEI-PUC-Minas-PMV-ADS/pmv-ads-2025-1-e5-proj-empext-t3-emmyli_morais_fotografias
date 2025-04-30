module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('marca_dagua', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      imagem: {
        type: Sequelize.BLOB('long'), 
        allowNull: false
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dtalteracao: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('marca_dagua');
  }
};