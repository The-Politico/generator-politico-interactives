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
      this.templatePath('gulp/tasks/img-watch.js'),
      this.destinationPath('gulp/tasks/img-watch.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img.js'),
      this.destinationPath('gulp/tasks/img.js'));
  }

  installing() {
    const dependencies = [
      'glob',
      'gulp-responsive',
      'gulp-watch',
    ];

    this.yarnInstall(dependencies, { dev: true });
  }
};
