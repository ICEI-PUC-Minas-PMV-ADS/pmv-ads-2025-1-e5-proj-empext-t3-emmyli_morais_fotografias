const { Eventos, DetalheEvento, sequelize } = require("../../models");
const {
  deleteFotoBunnyStorage,
  uploadFotoBunnyStorage,
} = require("../../service/uploadService");
const Api_Controller = require("../Api_Controller");

class EventosController extends Api_Controller {
  constructor() {
    super("Eventos");
  }

  async create(req, res) {
    const data = req.body;
    const files = req.files;

    const transaction = await sequelize.transaction();

    try {
      const novoEvento = await Eventos.create(
        {
          nome: data.nome,
          descricao: data.descricao,
          data_evento: data.data_evento,
          hora_evento: data.hora_evento,
          local: data.local,
          publico: data.publico,
          exibirtrabalho: data.exibirtrabalho,
          idmarcadagua: data.idmarcadagua,
          /*categoria_id: data.categoria_id ? Number(data.categoria_id) : null,*/
          urlevento: data.urlevento,
        },
        { transaction }
      );

      // Upload das imagens e criação dos detalhes
      if (files && files.length > 0) {
        const detalhes = await Promise.all(
          files.map(async (file, index) => {
            const url = await uploadFotoBunnyStorage(file);
            return {
              evento_id: novoEvento.id,
              foto: url,
              tem_marca_agua: true,
              ordem: index,
              dtinclusao: new Date(),
              dtalteracao: new Date(),
            };
          })
        );

        await DetalheEvento.bulkCreate(detalhes, { transaction });
      }

      await transaction.commit();

      // Retorna o evento criado com os detalhes
      const eventoComDetalhes = await Eventos.findByPk(novoEvento.id, {
        include: [{ model: DetalheEvento, as: "detalhes" }],
      });

      return res.status(201).json(eventoComDetalhes);
    } catch (error) {
      await transaction.rollback();
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ error: "Erro ao criar evento" });
    }
  }

  async update(req, res) {
    const eventoId = req.params.id;
    const data = req.body;
    const files = req.files;

    const transaction = await sequelize.transaction();

    try {
      const evento = await Eventos.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      // Atualizar os dados do evento
      await evento.update(
        {
          nome: data.nome,
          descricao: data.descricao,
          data_evento: data.data_evento,
          hora_evento: data.hora_evento,
          local: data.local,
          publico: data.publico,
          exibirtrabalho: data.exibirtrabalho,
          idmarcadagua: data.idmarcadagua,
         /* categoria_id: data.categoria_id ? Number(data.categoria_id) : null,*/
          urlevento: data.urlevento,
        },
        { transaction }
      );

      // Se novas imagens foram enviadas, substituir as antigas
      /*if (files && files.length > 0) {
        const detalhesAntigos = await DetalheEvento.findAll({
          where: { evento_id: eventoId },
        });

        // Excluir imagens antigas do Bunny e do banco
        await Promise.all(
          detalhesAntigos.map(async (detalhe) => {
            await deleteFotoBunnyStorage(detalhe.foto); // Deleta do storage
            await detalhe.destroy({ transaction }); // Deleta do banco
          })
        );

        // Upload e criação dos novos detalhes
        const novosDetalhes = await Promise.all(
          files.map(async (file, index) => {
            const url = await uploadFotoBunnyStorage(file);
            return {
              evento_id: eventoId,
              foto: url,
              tem_marca_agua: true,
              ordem: index,
              dtinclusao: new Date(),
              dtalteracao: new Date(),
            };
          })
        );

        await DetalheEvento.bulkCreate(novosDetalhes, { transaction });
      }*/

      await transaction.commit();

      // Retorna o evento atualizado com os detalhes
      const eventoAtualizado = await Eventos.findByPk(eventoId, {
        include: [{ model: DetalheEvento, as: "detalhes" }],
      });

      return res.status(200).json(eventoAtualizado);
    } catch (error) {
      await transaction.rollback();
      console.error("Erro ao atualizar evento:", error);
      return res.status(500).json({ error: "Erro ao atualizar evento" });
    }
  }

  async updateFirstImage(req, res) {
  try {
    const eventoId = req.params.id;
    const { detalheId } = req.body;

    const evento = await Eventos.findByPk(eventoId, {
      include: [{ model: DetalheEvento, as: 'detalhes' }]
    });

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    const detalheParaPorEmPrimeiro = evento.detalhes.find((detalhe) => detalhe.id === detalheId);

    if (!detalheParaPorEmPrimeiro) {
      return res.status(404).json({ error: "Detalhe não encontrado no evento" });
    }

    // Remove o detalhe da posição atual e adiciona no final
    const indexDeDetalhe = evento.detalhes.indexOf(detalheParaPorEmPrimeiro);
    evento.detalhes.splice(indexDeDetalhe, 1);
    evento.detalhes.unshift(detalheParaPorEmPrimeiro);

    // Atualiza a ordem de todos os detalhes
    const atualizacoes = evento.detalhes.map((detalhe, index) =>
      DetalheEvento.update(
        { ordem: index },
        { where: { id: detalhe.id } }
      )
    );

    await Promise.all(atualizacoes);

    return res.status(204).send(); // Sem conteúdo, mas sucesso
  } catch (error) {
    console.error("Erro ao atualizar ordem dos detalhes:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

}

module.exports = new EventosController();
