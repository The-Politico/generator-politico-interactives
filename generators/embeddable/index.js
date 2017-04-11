const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.log('Embeddable');
    const questions = [];

    return this.prompt(questions);
  }
};
