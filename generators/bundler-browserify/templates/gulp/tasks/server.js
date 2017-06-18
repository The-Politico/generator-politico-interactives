const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const ngrok = require('ngrok');
const open = require('open');
const argv = require('yargs').argv;
const os = require('os');
const path = require('path');

const startTunel = (port) => {
  const ngrokConfig = Object.assign({ addr: port },
    // eslint-disable-next-line
    require(path.join(os.homedir(), '.ngrok2/interactives.json'))
  );
  ngrok.connect(ngrokConfig, (err, url) => { open(url); });
};

module.exports = () => {
  browserSync.init({
    files: ['./dist/**/*'],
    server: {
      baseDir: './dist/',
      index: 'index.html',
    },
    ghostMode: false,
  }, (err, bs) => {
    if (argv.ngrok) {
      startTunel(bs.options.get('port'));
    }
  });

  gulp.watch(['./src/scss/*.scss'], ['scss']);
};
