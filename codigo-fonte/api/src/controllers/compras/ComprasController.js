const Api_Controller = require('../Api_Controller');
const { Compras, ItensCompra, sequelize } = require('../../models');

class ComprasController extends Api_Controller {
  constructor() {
    super('Compras');
  }

  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { itensCompra, ...dadosCompra } = req.body;
     
      const novaCompra = await Compras.create(dadosCompra, { transaction: t });
      
      if (Array.isArray(itensCompra) && itensCompra.length > 0) {
        const itens = itensCompra.map(item => ({
          ...item,
          compraId: novaCompra.id
        }));

        await ItensCompra.bulkCreate(itens, { transaction: t });
      }

      await t.commit();
      return res.status(201).json(novaCompra);
    } catch (error) {
      await t.rollback();
      console.error('Erro ao criar compra com itens:', error);
      return res.status(500).json({ error: 'Erro ao criar compra com itens' });
    }
  }
}

module.exports = new ComprasController();
