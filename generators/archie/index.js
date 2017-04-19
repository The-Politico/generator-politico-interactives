const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  prompting() {
    const prompts = [{
      name: 'docId',
      message: 'What\'s your Google Doc ID?',
    }, {
      name: 'clientId',
      message: 'What\'s your Google client ID?',
      store: true,
    }, {
      name: 'clientSecret',
      message: 'What\'s your Google client secret key?',
      store: true,
    }];

    return this.prompt(prompts).then((answers) => {
      this.docId = answers.docId;
      this.clientId = answers.clientId;
      this.clientSecret = answers.clientSecret;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('gulp/tasks/archie.js'),
      this.destinationPath('gulp/tasks/archie.js'));

    const config = {
      docId: this.docId,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUrl: 'http://localhost:6006',
    };

    this.fs.writeJSON('./archie.json', config);
  }

  install() {
    const dependencies = [
      'archieml',
      'fs-extra',
      'googleapis',
      'google-auth-library',
      'htmlparser2',
      'html-entities',
      'open',
      'readline',
      'winston',
    ];

    this.yarnInstall(dependencies, { save: true });
  }
};
