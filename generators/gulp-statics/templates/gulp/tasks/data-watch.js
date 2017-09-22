const gulp = require('gulp');
const watch = require('gulp-watch');

module.exports = () => {
  // run the task once on start
  gulp.start('data');

  return watch('./src/data/**/*.@(json|csv)', () => {
    gulp.start('data');
  });
};
