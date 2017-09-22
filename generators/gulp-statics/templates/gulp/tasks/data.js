const gulp = require('gulp');

module.exports = () =>
  gulp.src('./src/data/**/*.@(json|csv)').pipe(gulp.dest('./dist/data/'));
