const Generator = require('yeoman-generator');
const fs = require('fs-extra');

module.exports = class extends Generator {
  prompting() {
    const prompts = [{
      name: 'sheetId',
      message: 'What\'s your Google Sheet ID?',
    }];

    return this.prompt(prompts).then((answers) => {
      this.sheetId = answers.sheetId;
    });
  }

  writing() {
    fs.appendFileSync(this.destinationPath('.env'), `\nSHEETID=${this.sheetId}`);

    this.fs.copy(
      this.templatePath('gulp/tasks/spreadsheet.js'),
      this.destinationPath('gulp/tasks/spreadsheet.js'));
  }

  install() {
    const dependencies = [
      'copytext',
    ];

    this.yarnInstall(dependencies, { save: true });
  }
};
