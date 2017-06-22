const Generator = require('yeoman-generator');

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
    this.fs.copy(
      this.templatePath('gulp/tasks/archie.js'),
      this.destinationPath('gulp/tasks/archie.js'));

    const config = {
      docId: this.docId,
    };

    this.fs.writeJSON('./archie.json', config);
  }

  install() {
    const dependencies = [
      'archieml-pipe',
    ];

    this.yarnInstall(dependencies, { save: true });
  }
};
