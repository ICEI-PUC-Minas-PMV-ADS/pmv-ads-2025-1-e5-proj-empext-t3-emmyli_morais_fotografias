const Api_Controller = require("../Api_Controller");
const { MarcaDagua } = require("../../models");
const { uploadFotoBunnyStorage } = require('../../service/uploadService');

class MarcaDaguaController extends Api_Controller {
  constructor() {
    super("MarcaDagua");
  }

  async create(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem enviada." });
      }

      const imageUrl = await uploadFotoBunnyStorage(req.file);

      const novaMarca = await MarcaDagua.create({ imagem: imageUrl });

      return res.status(201).json({ id: novaMarca.id, url: imageUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar marca d'água" });
    }
  }

}

module.exports = new MarcaDaguaController();
