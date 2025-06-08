const Api_Controller = require('../Api_Controller');
const { Carrinho, CarrinhoFotos } = require('../../models');

class CarrinhoController extends Api_Controller {
  constructor() {
    super('Carrinho');
  }

  // Sobrescrevemos o getAll para filtrar por usuario_id e/ou evento_id
  async getAll(req, res) {
    try {
      const where = {};
      if (req.query.usuario_id) where.usuario_id = req.query.usuario_id;
      if (req.query.evento_id)  where.evento_id  = req.query.evento_id;

      const lista = await Carrinho.findAll({
        where,
        order: [["dtinclusao", "DESC"]],
      });
      return res.json(lista);
    } catch (error) {
      console.error("Erro ao listar carrinhos:", error);
      return res.status(500).json({ error: "Erro ao listar carrinhos" });
    }
  }

  async create(req, res) {
    try {
      const { usuario_id, evento_id, descricao, preco_unitario, quantidade, total, fotos } = req.body;

      const novoCarrinho = await Carrinho.create({ usuario_id, evento_id, descricao, preco_unitario, quantidade, total });

      if (fotos && fotos.length > 0) {
        const fotosParaSalvar = fotos.map((foto) => ({
          carrinho_id: novoCarrinho.id,
          id_foto: foto?.id || foto?.id_foto?.id // compatibilidade para entrada incorreta
        }));

        const fotosCriadas = await CarrinhoFotos.bulkCreate(fotosParaSalvar);
        console.log('Fotos criadas no banco:', fotosCriadas);
      }

      res.status(201).json(novoCarrinho);
    } catch (error) {
      console.error('Erro ao criar carrinho:', error);
      res.status(500).json({ error: 'Erro ao criar carrinho' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { fotos } = req.body;

      await Carrinho.update(req.body, { where: { id } });
      await CarrinhoFotos.destroy({ where: { carrinho_id: id } });

      if (fotos?.length > 0) {
        const novasFotos = fotos.map((foto) => ({
          carrinho_id: id,
          id_foto: foto?.id || foto?.id_foto?.id
        }));

        console.log('Novas fotos para salvar:', novasFotos);
        await CarrinhoFotos.bulkCreate(novasFotos);
      }

      return res.status(200).json({ message: 'Carrinho atualizado' });
    } catch (err) {
      console.error('Erro ao atualizar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao atualizar carrinho' });
    }
  }
}

module.exports = new CarrinhoController();
