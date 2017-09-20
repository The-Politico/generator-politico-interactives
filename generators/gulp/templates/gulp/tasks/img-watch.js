const gulp = require('gulp');
const watch = require('gulp-watch');

module.exports = () => {
    return watch('./src/images/**/*.@(jpg|png)', () => {
        gulp.start('img');
    });
}
