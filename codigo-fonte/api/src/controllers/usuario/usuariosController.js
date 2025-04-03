const Api_Controller = require('../Api_Controller');
const { Usuarios } = require('../../models'); 

class UsuariosController extends Api_Controller {
  constructor() {
    super('Usuarios');
  }
  
  async create(req, res) {
    try {
      const { nome, email, login, senha_hash } = req.body;
      console.log( req.body);
      const usuarioExistente = await Usuarios.findOne({ where: { login } });
     
      if (usuarioExistente) {
        return res.status(400).json({ error: "Este login já está em uso!" });
      }
      
      const emailExistente = await Usuarios.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ error: "Este e-mail já está cadastrado!" });
      }
      
      const novoUsuario = await Usuarios.create({
        nome,
        email,
        login,
        senha_hash,
        tipo: "cliente"
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

module.exports = new UsuariosController();
