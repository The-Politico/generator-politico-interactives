const { exec } = require('child_process');

module.exports = (cb) => {
  exec('node server/server.js --render', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}
