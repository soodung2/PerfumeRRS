var routes = require('../routes/index');

module.exports = function connectRoutes(app) {
    app.use('/index', routes);
  };