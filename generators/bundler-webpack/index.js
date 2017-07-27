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
    console.log(this.options.archie);

    mkdirp('./dist/js');
    mkdirp('./dist/css');
    mkdirp('./server')
    // Config files
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'));
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'));
    this.fs.copy(
      this.templatePath('webpack-prod.config.js'),
      this.destinationPath('webpack-prod.config.js'));
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js'));
    this.fs.copy(
      this.templatePath('server/server.js'),
      this.destinationPath('server/server.js'));
    this.fs.copy(
      this.templatePath('server/router.js'),
      this.destinationPath('server/router.js'));
    this.fs.copyTpl(
      this.templatePath('server/context.js'),
      this.destinationPath('server/context.js'), {
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
      'gulp-env',
      'gulp-util',
      'html-webpack-plugin',
      'lodash',
      'marked',
      'node-env-file',
      'node-sass',
      'nunjucks',
      'open',
      'optimize-css-assets-webpack-plugin',
      'postcss-loader',
      'run-sequence',
      'sass-loader',
      'secure-keys',
      'style-loader',
      'uglify-js',
      'uglifyjs-webpack-plugin',
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',
      'webpack-stream',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
};
