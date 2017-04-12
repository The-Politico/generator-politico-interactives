const runSequence = require('run-sequence');

const gulp = require('./gulp')([
  'nunjucks',
  'nunjucks-watch',
  'webpack',
  'aws',
  'img-copy',
  'img-optimize',
  'img-resize',
]);

gulp.task('default', ['nunjucks-watch', 'webpack']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});
