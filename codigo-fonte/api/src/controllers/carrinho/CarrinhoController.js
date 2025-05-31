const Api_Controller = require('../Api_Controller');

class CarrinhoController extends Api_Controller {
  constructor() {
    super('Carrinho');
  }
}

module.exports = new CarrinhoController();
