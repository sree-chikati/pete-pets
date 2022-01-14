const Pet = require('../models/pet');

module.exports = (app) => {
  // MAIN
  app.get('/', (req, res) => {
    res.render('main');
  });

}
