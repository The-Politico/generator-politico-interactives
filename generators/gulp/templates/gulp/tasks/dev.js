const argv = require('yargs').argv;
const app = require('../../server/server.js');
const ngrok = require('ngrok');
const open = require('open');

const startTunel = (port) => {
  ngrok.connect({
    authtoken: process.env.ngrokToken,
    auth: 'interactive:news',
    subdomain: 'politico',
    addr: port,
  }, (err, url) => { open(url); });
};

const port = 3000;

module.exports = (cb) => {
  app.startServer(port);

  if (argv.ngrok) {
    startTunel(port);
  }
};
