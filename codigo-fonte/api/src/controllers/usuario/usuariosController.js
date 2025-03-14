const Api_Controller = require('../Api_Controller');

class UsuariosController extends Api_Controller {
  constructor() {
    super('Usuarios'); //  nome do model 
  }

  
 /* async getProfile(req, res) {
    try {
      const { id } = req.params;
      const user = await this.models.Usuario.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'perfil'],
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o perfil do usuário' });
    }
  }*/
}

module.exports = new UsuariosController();
