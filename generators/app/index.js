const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../passphrase'));
    this.composeWith(require.resolve('../linters'));
    this.composeWith(require.resolve('../styles'));
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
