const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const merge = require('merge-stream');

module.exports = () => {
  const pngs = gulp.src([
    './src/images/**/*.png',
    '!./src/images/opt/**/*',
  ])
    .pipe(changed('./src/images/opt'))
    .pipe(
        imagemin({
          optimizationLevel: 4,
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
        }) // eslint-disable-line comma-dangle
    )
    .pipe(gulp.dest('./src/images/opt'));

  const jpgs = gulp.src([
    './src/images/**/*.{jpg,JPG}',
    '!./src/images/opt/**/*',
  ])
  .pipe(changed('./src/images/opt'))
  .pipe(
      imageminJpegRecompress({
        loops: 3,
        min: 50,
        max: 75,
        target: 0.9999,
        progressive: true,
      })() // eslint-disable-line comma-dangle
    )
    .pipe(gulp.dest('./src/images/opt'));

  return merge(pngs, jpgs);
};
