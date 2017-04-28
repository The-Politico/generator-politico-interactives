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
    this.composeWith(require.resolve('../styles'));
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
      type: 'confirm',
      name: 'archieML',
      message: 'Would like to include an ArchieML configuration?',
      default: false,
    }, {
      name: 'awsAccessKey',
      message: 'What\'s your AWS access key?',
      store: true,
    }, {
      name: 'awsSecretKey',
      message: 'What\'s your AWS secret key?',
      store: true,
    }];

    return this.prompt(questions).then((answers) => {
      this.projectType = answers.projectType;
      this.projectTitle = answers.projectTitle;
      this.projectSlug = S(answers.projectTitle).slugify().s;
      this.projectBundler = answers.projectBundler;
      this.archieML = answers.archieML;
      this.awsAccessKey = answers.awsAccessKey;
      this.awsSecretKey = answers.awsSecretKey;
    });
  }
  template() {
    switch (this.projectType) {
      case 'embed':
        this.composeWith(require.resolve('../templates-embeddable'), {
          title: this.projectTitle,
          webpack: this.projectBundler === this.WEBPACK,
          archie: this.archieML,
        });
        break;
      default:
        this.composeWith(require.resolve('../templates-page'), {
          title: this.projectTitle,
          webpack: this.projectBundler === this.WEBPACK,
          archie: this.archieML,
        });
    }
  }
  writing() {
    this.fs.copy(
      this.templatePath('aws.json.example'),
      this.destinationPath('aws.json.example'));

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        slug: this.projectSlug,
        userName: this.user.git.name(),
        userEmail: this.user.git.email(),
      });

    const awsJSON = {
      accessKeyId: this.awsAccessKey,
      secretAccessKey: this.awsSecretKey,
      params: {
        Bucket: 'com.politico.interactives.politico.com',
      },
    };

    const d = new Date();
    const metaJSON = {
      publishYear: d.getFullYear(),
      publishPath: this.projectType === 'embed' ?
        `${d.getFullYear()}/embed/${this.projectSlug}/` :
        `${d.getFullYear()}/${this.projectSlug}/`,
    };

    this.fs.writeJSON('aws.json', awsJSON);
    this.fs.writeJSON('meta.json', metaJSON);
  }
};
