const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const context = require('../../server/context.js');
const nunjucksSettings = require('../../server/nunjucks-settings.js');

const manageEnvironment = (environment) => {
  environment.addFilter('markdown', nunjucksSettings.markdownFilter);
};

module.exports = () => {
  const ctx = context.getContext();
  ctx.env = 'production';

  return gulp.src([
    'src/templates/**/*.html',
    '!src/templates/**/_*.html',
  ]).pipe(nunjucksRender({
    path: ['src/templates/'],
    data: ctx,
    manageEnv: manageEnvironment,
  })).pipe(gulp.dest('dist'));
};
