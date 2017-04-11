const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      type: 'list',
      name: 'projectType',
      message: 'Yo Politico! What do you want to make today?',
      choices: [
        {
          name: 'embeddable',
          value: 'embed',
        },
        {
          name: 'freestanding page',
          value: 'page',
        },
      ],
    }];

    return this.prompt(questions).then((answers) => {
      this.projectType = answers.projectType;
    });
  }
  template() {
    switch (this.projectType) {
      case 'embed':
        this.composeWith(require.resolve('../embeddable'));
        break;
      case 'page':
        this.composeWith(require.resolve('../page'));
        break;
      default:
        break;
    }
  }
};
