const { criarNotificacao, listarNaoVisualizadas } = require('../../service/notificacaoService');

class NotificacaoController {
    async getAll ( req, res ) {
        const notificacoesNaoLidas = await listarNaoVisualizadas()

        res.status(200).json(notificacoesNaoLidas)
    }
}

module.exports = new NotificacaoController();