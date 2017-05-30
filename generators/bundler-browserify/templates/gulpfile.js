const env = require('gulp-env');
const runSequence = require('run-sequence');
const gulp = require('./gulp')([
  'aws',
  <% if (archie) { %>'archie',<% } %>
  'browserify',
  'js-build',
  'js-watch',
  'nunjucks',
  'scss',
  'server',
  'img-copy',
  'img-optimize',
  'img-resize',
  'nunjucks-watch',
]);


gulp.task('build', ['scss', 'js-build', 'nunjucks']);
gulp.task('publish', (cb) => {
  env.set({ NODE_ENV: 'production' });
  runSequence('build', 'aws', cb);
});
gulp.task('default', ['nunjucks-watch', 'scss', 'js-watch', 'server']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});
