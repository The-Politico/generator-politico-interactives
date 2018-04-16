const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
  }
  install() {
    const dependencies = [
      'politico-style'
    ];
    this.yarnInstall(dependencies, { save: true });
  }
};
