const gulp = require('gulp');
const responsive = require('gulp-responsive');

module.exports = () =>
  gulp.src('./src/images/**/*.jpg')
    .pipe(responsive({
      '*': [{
        width: 400,
        rename: { suffix: '-400' },
      }, {
        width: 800,
        rename: { suffix: '-800' },
      }, {
        width: 1200,
        rename: { suffix: '-1200' },
      }, {
        width: 1800,
        rename: { suffix: '-1800' },
      }],
    }, {
      quality: 70,
      progressive: true,
      withMetadata: false,
      withoutEnlargement: true,
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest('./dist/images'));
