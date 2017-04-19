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
    const strip = kwargs.strip || false;
    return !strip ? safe(marked(str)) :
      safe(marked(str).trim().replace(/^<p>|<\/p>$/g, ''));
  });
};


module.exports = () => {
  const contextData = fs.readJsonSync(
    path.resolve(process.cwd(), 'src/templates/data.json'));

  return gulp.src('src/templates/index.html')
    .pipe(nunjucksRender({
      path: ['src/templates/'],
      data: contextData,
      manageEnv: manageEnvironment,
    }))
    .pipe(gulp.dest('dist'));
};
