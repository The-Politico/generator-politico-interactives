const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('embed', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Whether building an embeddable',
    });
  }

  writing() {
    mkdirp('./dist/js');
    mkdirp('./dist/css');
    // JS files
    this.fs.copy(
      this.templatePath('src/js/main.js'),
      this.destinationPath('src/js/main.js'));
    // Config files
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'));
    // Gulp files
    this.fs.copy(
      this.templatePath('gulp/tasks/nunjucks.js'),
      this.destinationPath('gulp/tasks/nunjucks.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/webpack.js'),
      this.destinationPath('gulp/tasks/webpack.js'));
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'));
  }

  install() {
    const dependencies = [
      'babel-core',
      'babel-loader',
      'babel-preset-env',
      'css-loader',
      'extract-text-webpack-plugin',
      'glob',
      'globby',
      'gulp',
      'gulp-nunjucks-render',
      'gulp-util',
      'html-webpack-plugin',
      'lodash',
      'node-sass',
      'open',
      'optimize-css-assets-webpack-plugin',
      'postcss-loader',
      'run-sequence',
      'sass-loader',
      'style-loader',
      'uglify-js',
      'uglifyjs-webpack-plugin',
      'webpack',
      'webpack-dev-server',
      'webpack-stream',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
};
