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
      this.templatePath('gulp/tasks/img.js'),
      this.destinationPath('gulp/tasks/img.js'));
  }
  install() {
    const dependencies = [
      'fs-extra',
      'gulp',
      'gulp-awspublish',
      'gulp-cloudfront-invalidate-aws-publish',
      'gulp-fail',
      'gulp-if',
      'gulp-prompt',
      'gulp-rename',
      'gulp-responsive',
      'gulp-rev-all',
      'gulp-util',
      'open',
    ];

    this.yarnInstall(dependencies, { save: true });
  }
};
