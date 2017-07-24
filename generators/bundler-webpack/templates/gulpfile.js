const runSequence = require('run-sequence');

const gulp = require('./gulp')([
  'aws',
  <% if (archie) { %>'archie',<% } %>
  'build',
  'dev',
  'html',
  'img-copy',
  'img-optimize',
  'img-resize',
]);

gulp.task('default', ['dev']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});

gulp.task('render', (cb) => {
  runSequence('html', 'img', 'build', cb);
});

gulp.task('publish', (cb) => {
  runSequence('render', 'aws', cb);
});
