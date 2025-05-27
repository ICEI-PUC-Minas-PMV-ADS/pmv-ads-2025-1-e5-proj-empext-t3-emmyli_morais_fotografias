module.exports = (sequelize, DataTypes) => {
  class Comentarios extends sequelize.Sequelize.Model {
    static associate(models) {

      Comentarios.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId',
        as: 'usuario',
        onDelete: 'CASCADE'
      });

      Comentarios.belongsTo(models.DetalheEvento, {
        foreignKey: 'detalheEventoId',
        as: 'detalhe',
        onDelete: 'CASCADE'
      });
    }
  }

  Comentarios.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    detalheEventoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Comentario: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    dtinclusao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dtalteracao: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Comentarios',
    tableName: 'comentarios',
    timestamps: false
  });

  return Comentarios;
};
