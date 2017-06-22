const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const ngrok = require('ngrok');
const open = require('open');
const argv = require('yargs').argv;

const startTunel = (port) => {
  ngrok.connect({
    authtoken: process.env.KEYS.ngrokToken,
    auth: 'interactive:news',
    subdomain: 'politico',
    addr: port,
  }, (err, url) => { open(url); });
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
