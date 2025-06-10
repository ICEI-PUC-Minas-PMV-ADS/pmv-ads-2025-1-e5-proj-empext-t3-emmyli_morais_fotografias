// src/controllers/enventos/EventosController.js

'use strict';

const {
  Eventos,
  DetalheEvento,
  VisualizacaoAlbum,
  CurtidaAlbum,
  MarcaDagua,
  CurtidaFoto,
  sequelize
} = require('../../models');
const {
  deleteFotoBunnyStorage,
  uploadFotoBunnyStorage
} = require('../../service/uploadService');
const Api_Controller = require('../Api_Controller');

class EventosController extends Api_Controller {
  constructor() {
    super('Eventos');
  }

  // === GET /api/eventos ===
  // Busca todos os eventos, inclue detalhes, watermark e armazena contagens em JS
  async getAll(req, res) {
    try {
      const eventosRaw = await Eventos.findAll({
        include: [
          {
            model: DetalheEvento,
            as: 'detalhes',
            attributes: ['id', 'foto', 'ordem', 'focoX', 'focoY', 'dtinclusao', 'dtalteracao'],
            include: [
              {
                model: CurtidaFoto,
                as: 'curtidasFotos',
                attributes: ['id']
              }
            ]
          },
          {
            model: VisualizacaoAlbum,
            as: 'visualizacoesAlbuns',
            attributes: ['id']
          },
          {
            model: CurtidaAlbum,
            as: 'curtidasAlbuns',
            attributes: ['id']
          },
          {
            model: MarcaDagua,
            as: 'marcaDagua',
            attributes: ['id', 'imagem']
          }
        ],
        order: [
          ['dtinclusao', 'DESC'],
          [{ model: DetalheEvento, as: 'detalhes' }, 'ordem', 'ASC']
        ],
        logging: false
      });

      // transforma cada instância em objeto plain e injeta os contadores
      const eventos = eventosRaw.map(evt => {
        const e = evt.get({ plain: true });

        // contagens
        const visualizacoes = e.visualizacoesAlbuns.length;
        const curtidasAlbum = e.curtidasAlbuns.length;
        const curtidasFotos = e.detalhes.reduce(
          (sum, det) => sum + (det.curtidasFotos?.length || 0),
          0
        );
        const totalCurtidas = curtidasAlbum + curtidasFotos;

        // não expomos os arrays crus
        delete e.visualizacoesAlbuns;
        delete e.curtidasAlbuns;
        // nota: e.detalhes continua com cada det.curtidasFotos

        return {
          ...e,
          visualizacoes,
          curtidasAlbum,
          curtidasFotos,
          totalCurtidas
        };
      });

      return res.status(200).json(eventos);
    } catch (erro) {
      console.error('Erro no getAll de Eventos:', erro);
      return res.status(500).json({ error: 'Erro ao listar eventos.' });
    }
  }

  // === GET /api/eventos/:id ===
  // Busca um único evento, inclui detalhes, watermark e contagens
  async getById(req, res) {
    const id = Number(req.params.id);
    try {
      const evento = await Eventos.findByPk(id, {
        include: [
          {
            model: DetalheEvento,
            as: 'detalhes',
            attributes: ['id', 'foto', 'ordem', 'dtinclusao', 'focoX', 'focoY', 'dtalteracao'],
            include: [
              { model: CurtidaFoto, as: 'curtidasFotos', attributes: ['id'] }
            ]
          },
          { model: VisualizacaoAlbum, as: 'visualizacoesAlbuns', attributes: ['id'] },
          { model: CurtidaAlbum, as: 'curtidasAlbuns', attributes: ['id'] },
          { model: MarcaDagua, as: 'marcaDagua', attributes: ['id', 'imagem'] }
        ],
        order: [
          [{ model: DetalheEvento, as: 'detalhes' }, 'ordem', 'ASC']
        ]
      });
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // contagens
      const qtdVis = evento.visualizacoesAlbuns.length;
      const qtdAlb = evento.curtidasAlbuns.length;
      const qtdFotos = evento.detalhes.reduce(
        (sum, det) => sum + (det.curtidasFotos?.length || 0),
        0
      );

      return res.status(200).json({
        id: evento.id,
        nome: evento.nome,
        descricao: evento.descricao,
        data_evento: evento.data_evento,
        hora_evento: evento.hora_evento,
        local: evento.local,
        publico: evento.publico,
        exibirtrabalho: evento.exibirtrabalho,
        urlevento: evento.urlevento,
        marcaDagua: evento.marcaDagua,   // { id, imagem }
        detalhes: evento.detalhes,     // cada detalhe já traz suas curtidasFotos
        visualizacoes: qtdVis,
        curtidasAlbum: qtdAlb,
        curtidasFotos: qtdFotos,
        totalCurtidas: qtdAlb + qtdFotos
      });
    } catch (erro) {
      console.error('Erro ao buscar evento:', erro);
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  // === POST /api/eventos ===
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
        categoria_id: data.categoria_id ? Number(data.categoria_id) : null,
        urlevento: data.urlevento
      }, { transaction });

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
              dtalteracao: new Date()
            };
          })
        );
        await DetalheEvento.bulkCreate(detalhes, { transaction });
      }

      await transaction.commit();

      const eventoComDetalhes = await Eventos.findByPk(novoEvento.id, {
        include: [
          { model: DetalheEvento, as: 'detalhes' },
          { model: MarcaDagua, as: 'marcaDagua', attributes: ['id', 'imagem'] }
        ]
      });
      return res.status(201).json(eventoComDetalhes);
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ error: 'Erro ao criar evento' });
    }
  }

  // === PUT /api/eventos/:id ===
  async update(req, res) {
    const eventoId = req.params.id;
    const data = req.body;
    const files = req.files;
    const transaction = await sequelize.transaction();

    try {
      const evento = await Eventos.findByPk(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      await evento.update({
        nome: data.nome,
        descricao: data.descricao,
        data_evento: data.data_evento,
        hora_evento: data.hora_evento,
        local: data.local,
        publico: data.publico,
        exibirtrabalho: data.exibirtrabalho,
        idmarcadagua: data.idmarcadagua,
        categoria_id: data.categoria_id ? Number(data.categoria_id) : null,
        urlevento: data.urlevento
      }, { transaction });

      if (files && files.length > 0) {
        const antigos = await DetalheEvento.findAll({ where: { evento_id: eventoId } });
        for (let d of antigos) await d.destroy({ transaction });

        const novos = await Promise.all(
          files.map(async (file, idx) => {
            const url = await uploadFotoBunnyStorage(file);
            return {
              evento_id: eventoId,
              foto: url,
              tem_marca_agua: true,
              ordem: idx,
              dtinclusao: new Date(),
              dtalteracao: new Date()
            };
          })
        );
        await DetalheEvento.bulkCreate(novos, { transaction });
        await transaction.commit();
        await Promise.all(antigos.map(d => deleteFotoBunnyStorage(d.foto)));
      } else {
        await transaction.commit();
      }

      const atualizado = await Eventos.findByPk(eventoId, {
        include: [
          { model: DetalheEvento, as: 'detalhes' },
          { model: MarcaDagua, as: 'marcaDagua', attributes: ['id', 'imagem'] }
        ]
      });
      return res.status(200).json(atualizado);
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao atualizar evento:', error);
      return res.status(500).json({ error: 'Erro ao atualizar evento' });
    }
  }

  // === PUT /api/eventos/:id/primeira_imagem ===
  async updateFirstImage(req, res) {
    try {
      const eventoId = req.params.id;
      const { detalheId } = req.body;
      const evento = await Eventos.findByPk(eventoId, {
        include: [{ model: DetalheEvento, as: 'detalhes' }]
      });
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      const det = evento.detalhes.find(d => d.id === detalheId);
      if (!det) {
        return res.status(404).json({ error: 'Detalhe não encontrado' });
      }

      // reordena na memória e no banco
      evento.detalhes = evento.detalhes.filter(d => d.id !== detalheId);
      evento.detalhes.unshift(det);

      await Promise.all(
        evento.detalhes.map((d, idx) =>
          DetalheEvento.update({ ordem: idx }, { where: { id: d.id } })
        )
      );
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao atualizar ordem dos detalhes:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async definirFoco(req, res) {
    const { detalheId } = req.params;
    const { focoX, focoY } = req.body;

    if (
      isNaN(focoX) || focoX < 0 || focoX > 100 ||
      isNaN(focoY) || focoY < 0 || focoY > 100
    ) {
      return res.status(400).json({ error: 'focoX e focoY devem estar entre 0 e 100' });
    }

    const detalhe = await DetalheEvento.findByPk(detalheId);
    if (!detalhe) return res.status(404).json({ error: 'Detalhe não encontrado' });

    detalhe.focoX = focoX;
    detalhe.focoY = focoY;
    await detalhe.save();

    return res.json({ sucesso: true });
  }
}

module.exports = new EventosController();
