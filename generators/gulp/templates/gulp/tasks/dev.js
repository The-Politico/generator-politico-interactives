const app = require('../../server/server.js');

module.exports = (cb) => {
  app.startServer(3000);
};
