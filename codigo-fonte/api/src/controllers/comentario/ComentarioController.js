const Api_Controller = require('../Api_Controller');

class ComentarioController extends Api_Controller {
  constructor() {
    super('Comentarios');
  }
}

module.exports = new ComentarioController();
