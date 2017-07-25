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
    this.fs.copy(
      this.templatePath('gulp/index.js'),
      this.destinationPath('gulp/index.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/aws.js'),
      this.destinationPath('gulp/tasks/aws.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/img.js'),
      this.destinationPath('gulp/tasks/img.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/dev.js'),
      this.destinationPath('gulp/tasks/dev.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/build.js'),
      this.destinationPath('gulp/tasks/build.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/html.js'),
      this.destinationPath('gulp/tasks/html.js'));
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        archie: this.options.archie,
      });

    if (this.archie) {
      this.fs.writeJSON('src/data/archie.json', {});
    }
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
