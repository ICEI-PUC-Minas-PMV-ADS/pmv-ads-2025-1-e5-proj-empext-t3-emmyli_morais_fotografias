const { z: zod } = require('zod')
const Api_Controller = require('../Api_Controller');
const { Usuarios } = require('../../models'); 
const cryptografyPassword = require('../../service/cryptographServices');

class UsuariosController extends Api_Controller {
  constructor() {
    super("Usuarios");
  }

  async create(req, res) {
    try {
      const { nome, email, login, senha } = req.body;
      console.log( req.body);
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
      
      const senha_hash = cryptografyPassword(senha);
      const novoUsuario = await Usuarios.create({
        nome,
        email,
        login,
        senha_hash,
        tipo: "cliente",
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async update(id, usuarioInfo, res) {
    try {
      const { nome, email, login, senha } = usuarioInfo;

      const UserSchema = zod.object({
        nome: zod.string().min(1, { message: "Nome não pode estar vazio" }),
        login: zod.string().min(1, { message: "Login não pode estar vazio" }),
        email: zod.string().email({ message: "Email inválido" }).min(1, { message: "Email não pode estar vazio" }),
        senha: zod.string().optional()
      });
  
      const resultadoValidacao = UserSchema.safeParse(usuarioInfo);
      
      if (!resultadoValidacao.success) {
        return res.status(400).json({ errors: resultadoValidacao.error.flatten().fieldErrors });
      }

      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
  
      // Verifica se o novo login já está em uso por outro usuário
      const outroComMesmoLogin = await Usuarios.findOne({
        where: { login, id: { [require('sequelize').Op.ne]: id } }
      });
      if (outroComMesmoLogin) {
        return res.status(400).json({ error: "Este login já está em uso por outro usuário!" });
      }
  
      // Verifica se o novo e-mail já está em uso por outro usuário
      const outroComMesmoEmail = await Usuarios.findOne({
        where: { email, id: { [require('sequelize').Op.ne]: id } }
      });
      if (outroComMesmoEmail) {
        return res.status(400).json({ error: "Este e-mail já está cadastrado por outro usuário!" });
      }

      if (senha !== ''){
        // Atualiza os dados com senha
        const senha_hash = cryptografyPassword(senha);
        await usuario.update({ nome, email, login, senha_hash });
      }
      else{
         // Atualiza os dados sem senha
         await usuario.update({ nome, email, login });
      }
      return res.status(204).json();
    } catch (error) {
      console.error("Erro ao editar dados do usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

module.exports = new UsuariosController();
