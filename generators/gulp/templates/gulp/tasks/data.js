const gulp = require('gulp');

module.exports = () => {
  return gulp.src('./src/data/**/*.@(json|csv)').pipe(gulp.dest('./dist/data/'))
}
