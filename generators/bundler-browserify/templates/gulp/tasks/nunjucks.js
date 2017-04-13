const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');

module.exports = () =>
  gulp.src('src/templates/index.html')
    .pipe(nunjucksRender({
      path: ['src/templates/'],
    }))
    .pipe(gulp.dest('dist'));
