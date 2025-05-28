const { Eventos, DetalheEvento, sequelize } = require('../../models');
const { deleteFotoBunnyStorage, uploadFotoBunnyStorage } = require('../../service/uploadService');
const Api_Controller = require('../Api_Controller');

class EventosController extends Api_Controller {
  constructor() {
    super('Eventos');
  }

  async create(req, res) {
    const data = req.body;
    const files = req.files;

    const transaction = await sequelize.transaction();

    try {
      
      const novoEvento = await Eventos.create({
        nome: data.nome,
        descricao: data.descricao,
        data_evento: data.data_evento,
        hora_evento: data.hora_evento,
        local: data.local,
        publico: data.publico,
        exibirtrabalho: data.exibirtrabalho,
        idmarcadagua: data.idmarcadagua,
        urlevento: data.urlevento
      }, { transaction });

      // Upload das imagens e criação dos detalhes
    if (files && files.length > 0) {
      const detalhes = await Promise.all(files.map(async (file, index) => {
        const url = await uploadFotoBunnyStorage(file); 
        return {
          evento_id: novoEvento.id,
          foto: url,
          tem_marca_agua: true,
          ordem: index,
          dtinclusao: new Date(),
          dtalteracao: new Date()
        };
      }));

      await DetalheEvento.bulkCreate(detalhes, { transaction });
    }
      
     

      await transaction.commit();

      // Retorna o evento criado com os detalhes
      const eventoComDetalhes = await Eventos.findByPk(novoEvento.id, {
        include: [{ model: DetalheEvento, as: 'detalhes' }]
      });

      return res.status(201).json(eventoComDetalhes);

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ error: 'Erro ao criar evento' });
    }
  }
}

module.exports = new EventosController();
