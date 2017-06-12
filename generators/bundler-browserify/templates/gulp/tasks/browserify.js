const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const gutil = require('gulp-util');
const babelify = require('babelify');
const babili = require('gulp-babili');
const es = require('event-stream');

module.exports = (watch) => {
  const wrapper = watch ? watchify : b => b;
  const production = !watch; // If we're not watching, we're minifying.

  return () => {
    const files = [
      'main.js',
    ];

    const tasks = files.map((entry) => {
      const props = {
        entries: `./src/js/${entry}`,
        extensions: ['.js', '.jsx'],
        cache: {},
        packageCache: {},
        debug: true,
      };

      const bundler = wrapper(browserify(props).transform(babelify, {
        presets: ['es2015', 'react'],
      }));

      function bundle() {
        return bundler.bundle()
          .on('error', gutil.log.bind(gutil, 'Browserify Error'))
          .pipe(source(entry))
          .pipe(buffer())
          // eslint-disable-next-line no-param-reassign
          .pipe(rename((filePath) => { filePath.basename += '.bundle'; }))
          .pipe(production ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
          .pipe(production ? babili({
            removeConsole: true,
            mangle: {
              keepClassNames: true,
            },
          }).on('error', gutil.log) : gutil.noop())
          .pipe(production ? sourcemaps.write('./') : gutil.noop())
          .pipe(gulp.dest('./dist/js/'));
      }

      bundler.on('log', gutil.log);
      bundler.on('update', bundle);

      return bundle();
    });
    return es.merge.apply(null, tasks);
  };
};
