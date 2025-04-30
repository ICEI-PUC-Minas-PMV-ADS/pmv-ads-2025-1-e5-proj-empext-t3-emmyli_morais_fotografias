
const Api_Controller = require('../Api_Controller');
const { MarcaDagua } = require('../../models');

class MarcaDaguaController extends Api_Controller {
  constructor() {
    super('MarcaDagua');
  }

async create(req, res) {
  console.log("chegou no controlador")
  try {
    const imagemBuffer = req.file.buffer;
    console.log("imagemBuffer:", imagemBuffer)
    const novaMarca = await MarcaDagua.create({ imagem: imagemBuffer });
    console.log("novaMarca:", novaMarca)
    return res.status(201).json({ id: novaMarca.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar marca d\'água' });
  }
}

}

module.exports = new MarcaDaguaController();