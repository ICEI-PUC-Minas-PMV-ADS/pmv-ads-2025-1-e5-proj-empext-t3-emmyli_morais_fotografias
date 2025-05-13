// controllers/categoriaController.js
const { Categoria } = require('../../models');

const getAll = async (req, res) => {
  try {
    const cats = await Categoria.findAll({ order: [['nome', 'ASC']] });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

const create = async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });
  try {
    const [cat, created] = await Categoria.findOrCreate({ where: { nome } });
    if (!created) return res.status(409).json({ error: 'Categoria já existe' });
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const qtd = await Categoria.destroy({ where: { id } });
    if (!qtd) return res.status(404).json({ error: 'Categoria não encontrada' });
    res.json({ message: 'Categoria removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover categoria' });
  }
};

module.exports = { getAll, create, remove };
