const Generator = require('yeoman-generator');
const fs = require('fs-extra');

module.exports = class extends Generator {

  prompting() {
    const prompts = [{
      name: 'docId',
      message: 'What\'s your Google Doc ID?',
    }];

    return this.prompt(prompts).then((answers) => {
      this.docId = answers.docId;
    });
  }

  writing() {
    fs.appendFileSync(this.destinationPath('.env'), `\nARCHIEDOC=${this.docId}`);

    this.fs.copy(
      this.templatePath('gulp/tasks/archie.js'),
      this.destinationPath('gulp/tasks/archie.js'));
  }

  install() {
    const dependencies = [
      'archieml-pipe',
    ];

    this.yarnInstall(dependencies, { save: true });
  }
};
