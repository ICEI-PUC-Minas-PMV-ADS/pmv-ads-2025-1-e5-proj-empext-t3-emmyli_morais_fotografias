const crypto = require('crypto');
const { Usuarios } = require('../models');

async function seedUsuarios() {
  try {
    // Limpa a tabela antes de inserir novos usuários
    await Usuarios.destroy({ where: {} });

    // Usuários para teste
    const usuariosTeste = [
      {
        nome: 'Usuário Teste',
        email: 'teste@email.com',
        login: 'teste',
        senha_hash: crypto.createHash('md5').update('123456').digest('hex'),
        tipo: 'cliente',
        dtinclusao: new Date(),
        dtalteracao: new Date()
      },
      {
        nome: 'Fotógrafo Admin',
        email: 'admin@email.com',
        login: 'admin',
        senha_hash: crypto.createHash('md5').update('admin123').digest('hex'),
        tipo: 'fotografo',
        dtinclusao: new Date(),
        dtalteracao: new Date()
      }
    ];

    // Insere os usuários no banco
    await Usuarios.bulkCreate(usuariosTeste);

    console.log('Usuários de teste inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir usuários:', error);
  }
}

// Executa a seed
seedUsuarios();
