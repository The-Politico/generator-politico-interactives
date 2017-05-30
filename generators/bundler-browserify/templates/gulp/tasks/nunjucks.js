const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const safe = require('nunjucks').runtime.markSafe;
const marked = require('marked');
const fs = require('fs-extra');
const path = require('path');

marked.setOptions({ smartypants: true });

const manageEnvironment = (environment) => {
  environment.addFilter('markdown', (str, kwargs) => {
    // strip outer <p> tags?
    const strip = typeof kwargs === 'undefined' ?
      false : kwargs.strip || false;
    return !strip ? safe(marked(str)) :
      safe(marked(str).trim().replace(/^<p>|<\/p>$/g, ''));
  });
};


module.exports = () => {
  const contextData = fs.readJsonSync(
    path.resolve(process.cwd(), 'src/templates/data.json'));
  const meta = fs.readJsonSync(
    path.resolve(process.cwd(), 'meta.json'));

  const templateContext = Object.assign({ meta }, contextData);

  return gulp.src('src/templates/index.html')
    .pipe(nunjucksRender({
      path: ['src/templates/'],
      data: templateContext,
      manageEnv: manageEnvironment,
    }))
    .pipe(gulp.dest('dist'));
};
