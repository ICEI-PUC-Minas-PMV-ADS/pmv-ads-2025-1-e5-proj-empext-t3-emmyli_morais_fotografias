module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      login: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      senha_hash: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tipo: {
        type: DataTypes.ENUM('fotografo', 'cliente'),
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
      tableName: 'usuarios',
      timestamps: false
    });
  
    Usuarios.associate = (models) => {
      Usuarios.hasOne(models.DetalheUsuario, {
        foreignKey: 'idusuario',
        as: 'detalhes',
        onDelete: 'CASCADE'
      });

      Usuarios.hasMany(models.Comentarios, {
        foreignKey: 'usuarioId',
        as: 'comentarios'
      });

  };
  
    return Usuarios;
  };
  