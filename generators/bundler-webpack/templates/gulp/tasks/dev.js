const app = require('../../server.js');

module.exports = (cb) => {
  app.startServer(3000);
};
