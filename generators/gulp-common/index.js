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
      this.templatePath('gulp/tasks/dev.js'),
      this.destinationPath('gulp/tasks/dev.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/build.js'),
      this.destinationPath('gulp/tasks/build.js'));
  }

  installing() {
    const dependencies = [
      'fs-extra',
      'gulp',
      'gulp-awspublish',
      'gulp-cloudfront-invalidate-aws-publish',
      'gulp-fail',
      'gulp-if',
      'gulp-nodemon',
      'gulp-prompt',
      'gulp-rename',
      'gulp-rev-all',
      'gulp-util',
      'ngrok',
      'nodemon',
      'portfinder',
      'open',
    ];

    this.yarnInstall(dependencies, { dev: true });
  }
};
