const Api_Controller = require('../Api_Controller');

class ProdutosController extends Api_Controller {
  constructor() {
    super('Produto');
  }
}

module.exports = new ProdutosController();
