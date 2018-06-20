const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('src/ai/config.yml'),
      this.destinationPath('src/ai/config.yml'));
    this.fs.copy(
      this.templatePath('src/templates/partials/_ai2html-resizer.html'),
      this.destinationPath('src/templates/partials/_ai2html-resizer.html'));
  }
};
