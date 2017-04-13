const browserSync = require('browser-sync').create();
const gulp = require('gulp');

module.exports = () => {
  browserSync.init({
    files: ['./dist/**/*'],
    server: {
      baseDir: './dist/',
      index: <% if (embed) { %>'embed.html'<% } else {%>'index.html'<% } %>,
    },
    ghostMode: false,
  });

  gulp.watch(['./src/scss/*.scss'], ['scss']);
};
