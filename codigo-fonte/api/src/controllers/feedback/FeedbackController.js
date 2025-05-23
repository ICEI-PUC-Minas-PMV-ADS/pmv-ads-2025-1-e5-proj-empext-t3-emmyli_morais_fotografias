const Api_Controller = require('../Api_Controller');

class FeedbackController extends Api_Controller {
  constructor() {
    super('Feedback');
  }
}

module.exports = new FeedbackController();
