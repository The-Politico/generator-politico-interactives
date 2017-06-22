const env = require('gulp-env');
const runSequence = require('run-sequence');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const SecureKeys = require('secure-keys');
const gutil = require('gulp-util');
const gulp = require('./gulp')([
  'aws',
//  <% if (archie) { %>'archie',<% } %>
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
require('dotenv').config();

const secure = new SecureKeys({ secret: process.env.PASSWORD });
const keysPath = path.join(os.homedir(), '.politico/interactives.json');
const keysObj = fs.readJsonSync(keysPath);

try {
  env.set({
    KEYS: secure.decrypt(keysObj),
  });
} catch (e) {
  gutil.log('Could not read keys. Check password.');
}


gulp.task('build', ['scss', 'js-build', 'nunjucks']);
gulp.task('publish', (cb) => {
  env.set({ NODE_ENV: 'production' });
  runSequence('build', 'aws', cb);
});
gulp.task('default', ['nunjucks-watch', 'scss', 'js-watch', 'server']);

gulp.task('img', (cb) => {
  runSequence('img-optimize', 'img-resize', 'img-copy', cb);
});
