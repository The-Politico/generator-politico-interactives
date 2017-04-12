const runSequence = require('run-sequence');

const gulp = require('./gulp')([
  'aws',
  'nunjucks',
  'webpack',
  'img-copy', // from gulp generator ↓ ↓ ↓ ↓
  'img-optimize',
  'img-resize',
  'nunjucks-watch',
]);

gulp.task('default', ['nunjucks-watch', 'webpack']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});
