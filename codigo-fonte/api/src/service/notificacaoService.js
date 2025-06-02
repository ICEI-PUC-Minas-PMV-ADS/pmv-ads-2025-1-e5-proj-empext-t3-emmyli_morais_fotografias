const { Notificacao } = require('../models');

async function criarNotificacao({ topico, acao, local_acao }) {
  try {
    const novaNotificacao = await Notificacao.create({
      topico,
      acao,
      local_acao
    });

    return novaNotificacao;
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    throw new Error('Erro ao criar notificação');
  }
}

async function listarNaoVisualizadas() {
  try {
    const notificacoes = await Notificacao.findAll({
      where: {
        foiVisualizado: false
      },
      order: [['data_criacao', 'DESC']]
    });

    return notificacoes;
  } catch (error) {
    console.error('Erro ao buscar notificações não visualizadas:', error);
    throw new Error('Erro ao buscar notificações não visualizadas');
  }
}

module.exports = {
  criarNotificacao,
  listarNaoVisualizadas
};
