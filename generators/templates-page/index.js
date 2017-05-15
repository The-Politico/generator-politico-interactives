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

    this.option('webpack', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use webpack module bundler',
    });
    this.option('archie', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use ArchieML',
    });
  }

  initializing() {
    switch (this.options.webpack) {
      case true:
        this.composeWith(require.resolve('../bundler-webpack'), {
          embed: false,
          archie: this.options.archie,
        });
        break;
      default:
        this.composeWith(require.resolve('../bundler-browserify'), {
          embed: false,
          archie: this.options.archie,
        });
    }
    if (this.options.archie) this.composeWith(require.resolve('../archie'));
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
      {
        cssInclude: !this.options.webpack, // Don't include script tags for webpack
        jsInclude: !this.options.webpack, // which injects them automatically.
      });
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
      this.templatePath('src/templates/ads/cube.html'),
      this.destinationPath('src/templates/ads/cube.html'));
    this.fs.copy(
      this.templatePath('src/templates/ads/supercube1.html'),
      this.destinationPath('src/templates/ads/supercube1.html'));
    this.fs.copy(
      this.templatePath('src/templates/ads/supercube2.html'),
      this.destinationPath('src/templates/ads/supercube2.html'));
    this.fs.copy(
      this.templatePath('src/templates/ads/script.html'),
      this.destinationPath('src/templates/ads/script.html'));
    // Template context
    this.fs.writeJSON('src/templates/data.json', {});
    // Images directory
    mkdirp('./src/images');
    mkdirp('./src/images/opt');
  }

  end() {
    const nunjucksTask = this.spawnCommand('gulp', ['nunjucks']);
    nunjucksTask.on('close', () => {
      // Copy the rendered template over initially
      if (this.options.webpack) {
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
