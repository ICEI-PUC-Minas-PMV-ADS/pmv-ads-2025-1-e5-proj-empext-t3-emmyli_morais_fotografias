const Api_Controller = require('../Api_Controller');

class EventosController extends Api_Controller {
  constructor() {
    super('Eventos'); // Nome do Model
  }
}

module.exports = new EventosController();
