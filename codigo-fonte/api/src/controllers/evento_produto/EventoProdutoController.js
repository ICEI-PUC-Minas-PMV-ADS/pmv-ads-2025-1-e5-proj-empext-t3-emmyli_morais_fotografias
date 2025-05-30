const Api_Controller = require('../Api_Controller');

class EventoProdutoController extends Api_Controller {
  constructor() {
    super('EventoProduto');
  }
}

module.exports = new EventoProdutoController();
