const gulp = require('gulp');
const changed = require('gulp-changed');
const merge = require('merge-stream');
const rename = require('gulp-rename');

module.exports = () => {
  // Copies over SVGs or other image files
  const other = gulp.src([
    './src/images/**/*',
    '!./src/images/**/*.{png,jpg,JPG}',
    '!./src/images/opt/**/*',
  ], { nodir: true })
    .pipe(changed('./dist/images'))
    .pipe(gulp.dest('./dist/images'));
  // Copy imgs that weren't resized
  const copied = gulp.src('./src/images/opt/**/_*.{png,jpg,JPG}')
    .pipe(rename((path) => {
      path.basename = path.basename.slice(1); // eslint-disable-line no-param-reassign
    }))
    .pipe(changed('./dist/images'))
    .pipe(gulp.dest('./dist/images'));

  return merge(other, copied);
};
