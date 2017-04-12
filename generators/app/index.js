const Generator = require('yeoman-generator');
const S = require('string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.BROWSERIFY = 'browserify';
    this.WEBPACK = 'webpack';
  }

  initializing() {
    this.composeWith(require.resolve('../linters'));
    this.composeWith(require.resolve('../gulp'));
  }

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
          name: 'interactive page',
          value: 'page',
        },
      ],
    }, {
      type: 'input',
      name: 'projectTitle',
      message: 'OK, what do we call it?',
    }, {
      type: 'list',
      name: 'projectBundler',
      message: 'Which module bundler would you like to use?',
      default: this.BROWSERIFY,
      choices: [
        {
          name: 'Browserify (default)',
          value: this.BROWSERIFY,
        },
        {
          name: 'Webpack (ES2015 + SCSS)',
          value: this.WEBPACK,
        },
      ],
    }, {
      name: 'awsAccessKey',
      message: 'Wha\'s your AWS access key?',
      store: true,
    }, {
      name: 'awsSecretKey',
      message: 'Wha\'s your AWS secret key?',
      store: true,
    }];

    return this.prompt(questions).then((answers) => {
      this.projectType = answers.projectType;
      this.projectTitle = answers.projectTitle;
      this.projectDir = S(answers.projectTitle).slugify().s;
      this.projectApp = S(answers.projectTitle).camelize().s;
      this.projectBundler = answers.projectBundler;
    });
  }
  template() {
    switch (this.projectType) {
      case 'embed':
        this.composeWith(require.resolve('../embeddable'), {
          title: this.projectTitle,
          webpack: this.projectBundler === this.WEBPACK,
        });
        break;
      default:
        this.composeWith(require.resolve('../page'), {
          title: this.projectTitle,
          webpack: this.projectBundler === this.WEBPACK,
        });
    }
  }
  writing() {
  
  }
};
