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
  }

  writing() {
    mkdirp('./dist/js');
    mkdirp('./dist/css');
    // Config files
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'));
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'));
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js'));
    this.fs.copy(
      this.templatePath('server.js'),
      this.destinationPath('server.js'));
    // Gulp files
    this.fs.copy(
      this.templatePath('gulp/tasks/nunjucks.js'),
      this.destinationPath('gulp/tasks/nunjucks.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/webpack.js'),
      this.destinationPath('gulp/tasks/webpack.js'));
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        archie: this.options.archie,
      });
  }

  install() {
    const dependencies = [
      'autoprefixer',
      'babel-core',
      'babel-loader',
      'babel-preset-env',
      "babel-preset-es2015",
      'css-loader',
      "express",
      'extract-text-webpack-plugin',
      'fs-extra',
      'glob',
      'globby',
      'gulp',
      'gulp-nunjucks-render',
      'gulp-util',
      'html-webpack-plugin',
      'lodash',
      'marked',
      'node-sass',
      'nunjucks',
      'open',
      'optimize-css-assets-webpack-plugin',
      'postcss-loader',
      'run-sequence',
      'sass-loader',
      'style-loader',
      'uglify-js',
      'uglifyjs-webpack-plugin',
      'webpack@2.6.1',
      'webpack-dev-middleware',
      'webpack-hot-middleware',
      'webpack-stream',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
};
