const { exec } = require('child_process');
const { argv } = require('yargs');
const open = require('open');

const port = argv.port || 8000;

module.exports = () => {
  exec(`python -m SimpleHTTPServer ${port}`, {
    cwd: './dist/',
  });
  open(`http://localhost:${port}`);
};
