const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

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
  }

  initializing() {
    switch (this.options.webpack) {
      case true:
        this.composeWith(require.resolve('../webpack'));
        break;
      default:
        this.composeWith(require.resolve('../browserify'));
    }
  }

  writing() {
    // Skeleton
    mkdirp('./src');
    mkdirp('./dist');
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: this.options.title });
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
