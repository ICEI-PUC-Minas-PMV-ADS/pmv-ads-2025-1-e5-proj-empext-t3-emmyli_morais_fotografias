module.exports = (sequelize, DataTypes) => {
    const DetalheUsuario = sequelize.define('DetalheUsuario', {
      idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      rua: DataTypes.STRING(100),
      numero: DataTypes.INTEGER,
      cep: DataTypes.STRING(10),
      bairro: DataTypes.STRING(100),
      cidade: DataTypes.STRING(100),
      cart_identidade: DataTypes.STRING(20),
      cpf: {
        type: DataTypes.STRING(20),
        unique: true
      },
      dtinclusao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      dtalteracao: DataTypes.DATE
    }, {
      tableName: 'detalhe_usuarios',
      timestamps: false
    });
  
    DetalheUsuario.associate = (models) => {
      DetalheUsuario.belongsTo(models.Usuarios, {
        foreignKey: 'idusuario',
        as: 'usuario',
        onDelete: 'CASCADE'
      });
    };
  
    return DetalheUsuario;
  };
  