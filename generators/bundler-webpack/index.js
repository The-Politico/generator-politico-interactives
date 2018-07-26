const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('archie', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use ArchieML',
    });
    this.option('context', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use context building',
    });
  }

  writing() {
    mkdirp('./dist/js');
    mkdirp('./dist/css');
    mkdirp('./server');
    // Config files
    this.fs.copy(
      this.templatePath('webpack-dev.config.js'),
      this.destinationPath('webpack-dev.config.js'));
    this.fs.copy(
      this.templatePath('webpack-prod.config.js'),
      this.destinationPath('webpack-prod.config.js'));
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js'));
    this.fs.copy(
      this.templatePath('server/server.js'),
      this.destinationPath('server/server.js'));
    this.fs.copyTpl(
      this.templatePath('server/nunjucks-settings.js'),
      this.destinationPath('server/nunjucks-settings.js'), {
        context: this.options.context,
      });
    if (this.options.context) {
      this.fs.copyTpl(
        this.templatePath('server/context.js'),
        this.destinationPath('server/context.js'), {
          archie: this.options.archie,
        });
    }
  }

  install() {
    const dependencies = [
      'autoprefixer',
      'babel-core',
      'babel-loader',
      'babel-preset-airbnb',
      'babel-preset-env',
      'babel-preset-react',
      'babel-preset-stage-0',
      'css-loader',
      'exports-loader',
      'express',
      'extract-text-webpack-plugin',
      'fs-extra',
      'glob',
      'globby',
      'gulp',
      'gulp-env',
      'gulp-util',
      'html-webpack-plugin',
      'imports-loader',
      'lodash',
      'marked',
      'node-env-file',
      'node-sass',
      'nunjucks',
      'open',
      'optimize-css-assets-webpack-plugin@3.2.0',
      'postcss-loader',
      'run-sequence',
      'sass-loader',
      'secure-keys',
      'style-loader',
      'uglify-es@3.3.9',
      'uglifyjs-webpack-plugin@1.1.8',
      'whatwg-fetch',
      'webpack@3.10.0',
      'webpack-dev-middleware@2.0.6',
      'webpack-hot-middleware',
      'webpack-stream@4.0.3',
    ];

    if (this.options.nunjucks) {
      dependencies.push('');
    }
    this.yarnInstall(dependencies, { save: true });
  }
};
