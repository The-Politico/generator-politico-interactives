const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('gulp/tasks/data-watch.js'),
      this.destinationPath('gulp/tasks/data-watch.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/data.js'),
      this.destinationPath('gulp/tasks/data.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/dist.js'),
      this.destinationPath('gulp/tasks/dist.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/html.js'),
      this.destinationPath('gulp/tasks/html.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img-watch.js'),
      this.destinationPath('gulp/tasks/img-watch.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img.js'),
      this.destinationPath('gulp/tasks/img.js'));
  }

  installing() {
    const dependencies = [
      'glob',
      'glob-promise',
      'gulp-nunjucks-render',
      'gulp-responsive',
      'gulp-watch',
      'yargs',
    ];

    this.yarnInstall(dependencies, { dev: true });
  }
};
