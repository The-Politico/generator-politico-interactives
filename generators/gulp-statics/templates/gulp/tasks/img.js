const glob = require('glob-promise');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const responsive = require('gulp-responsive');

let images = false;

module.exports = () => {
  function processImages() {
    return glob('./src/images/**/*.@(jpg|png)').then(paths => (
      new Promise((resolve) => {
        if (paths.length > 0) images = true;

        gulp.src('./src/images/**/*.@(jpg|png)')
          .pipe(gulpif(images, responsive({
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
          })))
          .pipe(gulp.dest('./dist/images'))
          .on('end', () => {
            resolve();
          });
      })
    ));
  }

  return processImages();
};
