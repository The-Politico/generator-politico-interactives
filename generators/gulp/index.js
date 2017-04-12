const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('gulp/index.js'),
      this.destinationPath('gulp/index.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/aws.js'),
      this.destinationPath('gulp/tasks/aws.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img-copy.js'),
      this.destinationPath('gulp/tasks/img-copy.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img-optimize.js'),
      this.destinationPath('gulp/tasks/img-optimize.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img-resize.js'),
      this.destinationPath('gulp/tasks/img-resize.js'));
  }
};
