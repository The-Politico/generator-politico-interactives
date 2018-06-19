const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('src/ai/config.yml'),
      this.destinationPath('src/ai/config.yml'));
  }
};
