const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [{
      name: 'viewName',
      message: 'What is your new page called?',
    }];

    return this.prompt(prompts).then((answers) => {
      this.viewName = answers.viewName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`src/templates/${this.viewName}/index.html`),
      {
        viewName: this.viewName,
      });
  }
};
