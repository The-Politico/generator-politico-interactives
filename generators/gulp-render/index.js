const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('gulp/tasks/dist.js'),
      this.destinationPath('gulp/tasks/dist.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/html.js'),
      this.destinationPath('gulp/tasks/html.js'));
  }

  installing() {
    const dependencies = [
      'gulp-nunjucks-render',
      'yargs',
    ];

    this.yarnInstall(dependencies, { dev: true });
  }
};
