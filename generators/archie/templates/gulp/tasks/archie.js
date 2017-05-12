const archiemlPipe = require('archieml-pipe').default;

module.exports = (cb) => {
  archiemlPipe('src/templates/data.json');
  cb();
};
