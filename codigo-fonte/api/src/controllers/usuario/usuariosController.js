const Api_Controller = require("../Api_Controller");
const { Usuarios } = require("../../models");
const crypto = require("crypto");

class UsuariosController extends Api_Controller {
  constructor() {
    super("Usuarios");
  }

  async create(req, res) {
    try {
      const { nome, email, login, senha_hash } = req.body;
      console.log(req.body);
      const usuarioExistente = await Usuarios.findOne({ where: { login } });

      if (usuarioExistente) {
        return res.status(400).json({ error: "Este login já está em uso!" });
      }

      const emailExistente = await Usuarios.findOne({ where: { email } });
      if (emailExistente) {
        return res
          .status(400)
          .json({ error: "Este e-mail já está cadastrado!" });
      }

      const novoUsuario = await Usuarios.create({
        nome,
        email,
        login,
        senha_hash: crypto.createHash("md5").update(senha_hash).digest("hex"),
        tipo: "cliente",
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  
    async update(req, res) {
      try {
        const { id } = req.params;
  
        if (req.body.senha_hash) {
          req.body.senha_hash = crypto.createHash('md5').update(req.body.senha_hash).digest('hex');
        }
  
        const [updated] = await Usuarios.update(req.body, { where: { id } });
  
        if (!updated) {
          return res.status(404).json({ error: 'Registro não encontrado' });
        }
  
        res.json({ message: 'Registro atualizado com sucesso' });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
      }
    }
  }
  
module.exports = new UsuariosController();
