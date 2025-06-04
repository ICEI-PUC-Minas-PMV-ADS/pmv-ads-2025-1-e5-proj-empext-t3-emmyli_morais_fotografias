const { Produto } = require('../../models');
const Api_Controller = require('../Api_Controller');

// controllers/ProdutosController.js
class ProdutosController extends Api_Controller {
  constructor() {
    super('Produto');
  }

  async getByEvento(req, res) {
    try {
      const { eventoId } = req.params;

      const produtos = await Produto.findAll({
        include: [{
          association: 'eventos',
          where: { id: eventoId },
          through: { attributes: [] } // oculta dados da tabela pivot
        }]
      });

      return res.json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar produtos por evento' });
    }
  }
}


module.exports = new ProdutosController();
