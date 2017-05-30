const gulp = require('gulp');

module.exports = () => gulp.watch('./src/templates/**/*', ['nunjucks']);
