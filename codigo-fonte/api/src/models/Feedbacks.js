module.exports = (sequelize, DataTypes) => {
  class Feedbacks extends sequelize.Sequelize.Model {
    static associate(models) {
      // Feedback pertence a um único usuário
      Feedbacks.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioId',
        as: 'usuarios',
        onDelete: 'CASCADE'
      });

      // Feedback pertence a um único álbum
      Feedbacks.belongsTo(models.Albuns, {
        foreignKey: 'albumId',
        as: 'albuns',
        onDelete: 'CASCADE'
      });
    }
  }

  Feedbacks.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feedback: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    satisfacao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exibirtrabalho: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Feedbacks',
    tableName: 'feedbacks',
    timestamps: false
  });

  return Feedbacks;
};
