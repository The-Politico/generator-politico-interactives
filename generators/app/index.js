const Generator = require('yeoman-generator');
const S = require('string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // Bundler options
    this.BROWSERIFY = 'browserify';
    this.WEBPACK = 'webpack';
    // Project type options
    this.EMBED = 'embed';
    this.PAGE = 'page';
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
          value: this.EMBED,
        },
        {
          name: 'interactive page',
          value: this.PAGE,
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
      this.projectBundler = answers.projectBundler;
      this.awsAccessKey = answers.awsAccessKey;
      this.awsSecretKey = answers.awsSecretKey;
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
    const awsJSON = {
      accessKeyId: this.awsAccessKey,
      secretAccessKey: this.awsSecretKey,
      params: {
        Bucket: 'interactives.politico.com',
      },
    };

    const d = new Date();
    const metaJSON = {
      year: d.getFullYear(),
      directory: `${d.getFullYear()}/${S(this.projectTitle).slugify().s}`,
    };

    this.fs.writeJSON('aws.json', awsJSON);
    this.fs.writeJSON('meta.json', metaJSON);
  }
};
