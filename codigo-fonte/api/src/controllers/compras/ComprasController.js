const Api_Controller = require('../Api_Controller');
const { Compras } = require('../../models');

class ComprasController extends Api_Controller {
  constructor() {
    super('Compras');
  }

  async create(req, res) {
    try {
      const { usuario_id, idevento, descricao, total, status, pagamento_id, carrinho_id } = req.body;

      let compra = await Compras.findOne({
        where: { usuario_id, idevento }
      });

      if (compra) {
        compra.descricao = descricao;
        compra.total = total;
        compra.status = status;
        compra.pagamento_id = pagamento_id;
        compra.carrinho_id = carrinho_id;
        await compra.save();
      } else {
        compra = await Compras.create({
          usuario_id,
          idevento,
          descricao,
          total,
          status,
          pagamento_id,
          carrinho_id
        });
      }

      return res.status(200).json(compra);
    } catch (error) {
      console.error('Erro ao criar/atualizar compra:', error);
      return res.status(500).json({ error: 'Erro ao processar compra' });
    }
  }
}

module.exports = new ComprasController();
