const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const S = require('string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('title', {
      type: String,
      required: true,
      desc: 'Project title',
    });

    this.option('webpack', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use webpack module bundler',
    });

    this.projectDir = S(this.options.title).slugify().s;
    this.projectApp = S(this.options.title).camelize().s;
  }

  initializing() {
    switch (this.options.webpack) {
      case true:
        this.composeWith(require.resolve('../webpack'), {
          embed: false,
        });
        break;
      default:
        this.composeWith(require.resolve('../browserify'), {
          embed: false,
        });
    }
  }

  writing() {
    // Skeleton
    mkdirp('./src');
    mkdirp('./dist');
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        title: this.projectApp,
        userName: this.user.git.name(),
        userEmail: this.user.git.email(),
      });
    // Nunjucks templates
    this.fs.copyTpl(
      this.templatePath('src/templates/index.html'),
      this.destinationPath('src/templates/index.html'),
      { title: this.options.title });
    this.fs.copyTpl(
      this.templatePath('src/templates/base.html'),
      this.destinationPath('src/templates/base.html'),
      {
        cssInclude: !this.options.webpack, // Don't include script tags for webpack
        jsInclude: !this.options.webpack, // which injects them automatically.
      });
    // SCSS files
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_colors.scss'),
      this.destinationPath('src/scss/_colors.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_fonts.scss'),
      this.destinationPath('src/scss/_fonts.scss'));
    // Images directory
    mkdirp('./src/images');
    mkdirp('./src/images/opt');
  }

  end() {
    const nunjucksTask = this.spawnCommand('gulp', ['nunjucks']);
    nunjucksTask.on('close', () => {
      const imgTask = this.spawnCommand('gulp', ['img']);
      imgTask.on('close', () => {
        this.spawnCommand('gulp');
      });
    });
  }
};
