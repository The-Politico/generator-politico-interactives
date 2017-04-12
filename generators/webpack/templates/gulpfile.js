const runSequence = require('run-sequence');

const gulp = require('./gulp')([
  'nunjucks',
  'webpack',
  'aws',
  'img-copy',
  'img-optimize',
  'img-resize',
]);

gulp.task('default', ['webpack']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});

gulp.watch('./src/templates/**/*.html', ['nunjucks']);
