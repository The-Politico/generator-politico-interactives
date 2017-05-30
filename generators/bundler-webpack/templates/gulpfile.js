const runSequence = require('run-sequence');

const gulp = require('./gulp')([
  'aws',
  <% if (archie) { %>'archie',<% } %>
  'nunjucks',
  'webpack',
  'img-copy',
  'img-optimize',
  'img-resize',
  'nunjucks-watch',
]);

gulp.task('default', ['nunjucks-watch', 'webpack']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});

gulp.task('publish', ['aws']);
