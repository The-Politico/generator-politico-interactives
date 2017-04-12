const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const questions = [];

    return this.prompt(questions);
  }
};
