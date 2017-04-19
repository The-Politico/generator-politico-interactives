const gulp = require('./gulp')([
  'aws',
  <% if (archie) { %>'archie',<% } %> // eslint-disable-line
  'browserify',
  'js-build',
  'js-watch',
  'nunjucks',
  'scss',
  'server',
  'img-copy', // from gulp generator ↓ ↓ ↓ ↓
  'img-optimize',
  'img-resize',
  'nunjucks-watch',
]);
const runSequence = require('run-sequence');


gulp.task('build', ['scss', 'js-build', 'nunjucks']);
gulp.task('publish', (cb) => { runSequence('build', 'aws', cb); });
gulp.task('default', ['nunjucks-watch', 'scss', 'js-watch', 'server']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});
