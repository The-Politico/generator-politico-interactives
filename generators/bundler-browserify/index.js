const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('archie', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use ArchieML',
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        archie: this.options.archie,
      });
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
      this.destinationPath('gulp/tasks/server.js'));
  }
  install() {
    const dependencies = [
      'babelify',
      'babel-preset-es2015',
      'babel-preset-react',
      'browserify',
      'browser-sync',
      'event-stream',
      'fs-extra',
      'gulp',
      'gulp-babili',
      'gulp-cssnano',
      'gulp-env',
      'gulp-if',
      'gulp-nunjucks-render',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-util',
      'marked',
      'ngrok',
      'nunjucks',
      'react',
      'run-sequence',
      'vinyl-buffer',
      'vinyl-source-stream',
      'watchify',
      'yargs',
    ];

    this.yarnInstall(dependencies, { save: true });
  }
};
