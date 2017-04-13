const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('embed', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Whether building an embeddable',
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('src/js/main.js'),
      this.destinationPath('src/js/main.js'));
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/browserify.js'),
      this.destinationPath('gulp/tasks/browserify.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/js-build.js'),
      this.destinationPath('gulp/tasks/js-build.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/js-watch.js'),
      this.destinationPath('gulp/tasks/js-watch.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/nunjucks.js'),
      this.destinationPath('gulp/tasks/nunjucks.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/scss.js'),
      this.destinationPath('gulp/tasks/scss.js'));
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/server.js'),
      this.destinationPath('gulp/tasks/server.js'), {
        embed: this.options.embed,
      });
  }
  install() {
    const dependencies = [
      'babelify',
      'babel-preset-es2015',
      'browserify',
      'browser-sync',
      'event-stream',
      'gulp',
      'gulp-nunjucks-render',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-uglify',
      'gulp-util',
      'run-sequence',
      'vinyl-buffer',
      'vinyl-source-stream',
      'watchify',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
};
