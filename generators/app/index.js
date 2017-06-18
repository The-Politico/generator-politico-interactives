const Generator = require('yeoman-generator');
const fs = require('fs');
const os = require('os');
const path = require('path');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../linters'));
    this.composeWith(require.resolve('../gulp'));
    this.composeWith(require.resolve('../styles'));
    this.composeWith(require.resolve('../aws'));

    const ngrokConfig = path.join(os.homedir(), '.ngrok2/interactives.json');
    if (!fs.existsSync(ngrokConfig)) {
      this.composeWith(require.resolve('../ngrok'));
    }
  }

  prompting() {
    const questions = [{
      type: 'input',
      name: 'title',
      message: 'Welcome to your new interactive. What will we call it?',
    }];

    return this.prompt(questions).then((answers) => {
      this.title = answers.title;
    });
  }
  template() {
    this.composeWith(require.resolve('../meta'), {
      title: this.title,
    });
    this.composeWith(require.resolve('../templates'), {
      title: this.title,
    });
  }
};
