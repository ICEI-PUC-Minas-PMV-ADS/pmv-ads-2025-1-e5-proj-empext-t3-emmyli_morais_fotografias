const notificacaoService = require('../service/notificacaoService');

/**
 * Gera um middleware que cria uma notificação ao ser executado.
 * 
 * @param {Object|Function} config - Objeto com { topico, acao, local_acao } ou função (req) => objeto
 * @returns {Function} Middleware do Express
 */
function factoryMiddlewareNotification(config) {
  return async (req, res, next) => {
    try {
      const dados =
        typeof config === 'function' ? config(req) : config;

      if (!dados?.topico || !dados?.acao || !dados?.local_acao) {
        console.warn('Dados de notificação incompletos. Ignorando notificação.');
        return next();
      }

      await notificacaoService.criarNotificacao(dados);
      next();
    } catch (err) {
      console.error('Erro ao gerar notificação:', err);
      // Continua mesmo se falhar a notificação
      next();
    }
  };
}

module.exports = factoryMiddlewareNotification;
