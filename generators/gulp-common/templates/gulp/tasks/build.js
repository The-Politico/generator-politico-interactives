const gulp = require('gulp');
const prodConfig = require('../../webpack-prod.config.js');
const webpackStream = require('webpack-stream');

module.exports = () =>
  gulp.src('src/js/main.js')
    .pipe(webpackStream(prodConfig))
    .pipe(gulp.dest('dist/'));
