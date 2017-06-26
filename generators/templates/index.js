const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('title', {
      type: String,
      required: true,
      desc: 'Project title',
    });

    this.BROWSERIFY = 'browserify';
    this.WEBPACK = 'webpack';
  }

  prompting() {
    const questions = [{
      type: 'list',
      name: 'bundler',
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
      name: 'archie',
      message: 'Would you like to include an ArchieML configuration?',
      default: false,
    }];

    return this.prompt(questions).then((answers) => {
      this.webpack = answers.bundler === this.WEBPACK;
      this.archie = answers.archie;
    });
  }

  template() {
    if (this.webpack) {
      this.composeWith(require.resolve('../bundler-webpack'), {
        archie: this.archie,
      });
    } else {
      this.composeWith(require.resolve('../bundler-browserify'), {
        archie: this.archie,
      });
    }
    if (this.archie) this.composeWith(require.resolve('../archie'));
  }

  writing() {
    // Skeleton
    mkdirp('./src');
    mkdirp('./dist');
    // Nunjucks templates
    this.fs.copy(
      this.templatePath('src/templates/index.html'),
      this.destinationPath('src/templates/index.html'));
    this.fs.copyTpl(
      this.templatePath('src/templates/base.html'),
      this.destinationPath('src/templates/base.html'),
      { webpack: this.webpack });
    // Meta
    this.fs.copy(
      this.templatePath('src/templates/meta/social.html'),
      this.destinationPath('src/templates/meta/social.html'));
    this.fs.copy(
      this.templatePath('src/templates/meta/telium.html'),
      this.destinationPath('src/templates/meta/telium.html'));
    this.fs.copy(
      this.templatePath('src/templates/meta/icons.html'),
      this.destinationPath('src/templates/meta/icons.html'));
    this.fs.copy(
      this.templatePath('src/templates/meta/comments.html'),
      this.destinationPath('src/templates/meta/comments.html'));
    // Ads
    this.fs.copy(
      this.templatePath('src/templates/ads/banner1.html'),
      this.destinationPath('src/templates/ads/banner1.html'));
    this.fs.copy(
      this.templatePath('src/templates/ads/banner2.html'),
      this.destinationPath('src/templates/ads/banner2.html'));
    this.fs.copy(
        this.templatePath('src/templates/ads/banner3.html'),
        this.destinationPath('src/templates/ads/banner3.html'));
    this.fs.copy(
        this.templatePath('src/templates/ads/banner4.html'),
        this.destinationPath('src/templates/ads/banner4.html'));
    this.fs.copy(
      this.templatePath('src/templates/ads/cube1.html'),
      this.destinationPath('src/templates/ads/cube1.html'));
    this.fs.copy(
        this.templatePath('src/templates/ads/cube2.html'),
        this.destinationPath('src/templates/ads/cube2.html'));
    this.fs.copy(
        this.templatePath('src/templates/ads/cube3.html'),
        this.destinationPath('src/templates/ads/cube3.html'));
    this.fs.copy(
        this.templatePath('src/templates/ads/cube4.html'),
        this.destinationPath('src/templates/ads/cube4.html'));
    this.fs.copy(
      this.templatePath('src/templates/ads/script.html'),
      this.destinationPath('src/templates/ads/script.html'));
    // Template context
    this.fs.writeJSON('src/templates/data.json', {});
    // Images directory
    this.fs.copy(
      this.templatePath('src/images/_share.jpg'),
      this.destinationPath('src/images/_share.jpg'));
    mkdirp('./src/images/opt');
    mkdirp('./dist/images');
    // Javascript
    this.fs.copy(
      this.templatePath('src/js/main.js'),
      this.destinationPath('src/js/main.js'));
  }

  end() {
    const nunjucksTask = this.spawnCommand('gulp', ['nunjucks']);
    nunjucksTask.on('close', () => {
      // Copy the rendered template over initially
      if (this.webpack) {
        fs.createReadStream('./src/index.html').pipe(fs.createWriteStream('./dist/index.html'));
      }

      const imgTask = this.spawnCommand('gulp', ['img']);
      imgTask.on('close', () => {
        // Need this for webpack. Investigating why...
        const yarnTask = this.spawnCommand('yarn', ['install']);
        yarnTask.on('close', () => {
          this.spawnCommand('gulp');
        });
      });
    });
  }
};
