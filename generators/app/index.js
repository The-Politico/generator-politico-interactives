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
        CloudFront: 'E3V6OHE700RHMR',
      },
    };

    const timestamp = new Date();
    const publishPath = this.projectType === 'embed' ?
      `${timestamp.getFullYear()}/embed/${this.projectSlug}/` :
      `${timestamp.getFullYear()}/${this.projectSlug}/`;

    const metaJSON = {
      id: (Math.floor(Math.random() * 100000000000) + 1).toString(),
      publishPath,
      url: `http://www.politico.com/interactives/${publishPath}`,
      share: {
        fbook: {
          card_title: this.projectTitle,
          card_description: '<Text>',
          author: 'politico',
        },
        twitter: {
          card_title: this.projectTitle,
          card_description: '<Text>',
          author: '@politico',
        },
        image: {
          url: `http://www.politico.com/interactives/${publishPath}images/share.jpg`,
          alt: '<Text>',
          type: 'image/jpeg',
          width: '600',
          height: '315',
        },
        keywords: 'Politico, News, Washington D.C.',
      },
      telium: {
        free_paid_content: 'free',
        site_section: 'white house',
        ad_unit_section: 'whitehouse',
        content_author: 'Polly Politico|Peter Politico',
        content_byline: 'By Polly Politico and Peter Politico',
        page_name: `${this.projectTitle} — POLITICO`,
      },
    };

    this.fs.writeJSON('aws.json', awsJSON);
    this.fs.writeJSON('meta.json', metaJSON);
  }
};
