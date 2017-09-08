const { argv } = require('yargs');
const app = require('../../server/server.js');
const ngrok = require('ngrok');
const open = require('open');
const portfinder = require('portfinder');

const port = argv.port || 3000;

const startTunnel = (port) => {
  ngrok.connect({
    authtoken: process.env.ngrokToken,
    auth: 'interactive:news',
    subdomain: 'politico',
    addr: port,
  }, (err, url) => { open(url); });
};

module.exports = (cb) => {
  portfinder.basePort = port;

  portfinder.getPortPromise()
    .then((foundPort) => {
      app.startServer(foundPort);
      if (argv.ngrok) {
        startTunnel(foundPort);
      }
    })
    .catch((err) => {
      console.error(err);
    })
};