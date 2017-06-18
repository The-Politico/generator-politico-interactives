const Generator = require('yeoman-generator');
const os = require('os');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      name: 'authtoken',
      message: 'What\'s your ngrok authtoken?',
      store: true,
    }];

    return this.prompt(questions).then((answers) => {
      this.authtoken = answers.authtoken;
    });
  }

  writing() {
    const ngrokConfig = {
      authtoken: this.authtoken,
      auth: 'interactive:news',
      subdomain: 'politico',
    };

    const writePath = path.join(os.homedir(), '.ngrok2/interactives.json');

    this.fs.writeJSON(writePath, ngrokConfig);
  }
};
