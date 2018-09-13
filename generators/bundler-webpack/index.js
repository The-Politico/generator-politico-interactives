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
      '@babel/core@7.0.0-beta.56',
      '@babel/plugin-external-helpers@7.0.0-beta.56',
      '@babel/plugin-proposal-class-properties@7.0.0-rc.1',
      '@babel/polyfill@7.0.0-beta.56',
      '@babel/preset-env@7.0.0-beta.56',
      '@babel/preset-react@7.0.0-beta.56',
      'archieml-pipe@0.1.0',
      'autoprefixer@9.1.3',
      'babel-loader@8.0.0',
      'css-loader@1.0.0',
      'eslint@3.19.0',
      'eslint-config-airbnb@17.1.0',
      'eslint-plugin-import@2.14.0',
      'eslint-plugin-jsx-a11y@6.1.1',
      'eslint-plugin-react@7.11.1',
      'exports-loader@0.7.0',
      'express@4.16.3',
      'extract-text-webpack-plugin@3.0.2',
      'fs-extra@7.0.0',
      'glob@7.1.3',
      'glob-promise@3.4.0',
      'globby@8.0.1',
      'gulp@3.9.1',
      'gulp-awspublish@3.3.3',
      'gulp-babel@8.0.0',
      'gulp-cloudfront-invalidate-aws-publish@1.0.0',
      'gulp-env@0.4.0',
      'gulp-fail@1.1.1',
      'gulp-if@2.0.2',
      'gulp-nodemon@2.2.1',
      'gulp-nunjucks-render@2.2.2',
      'gulp-prompt@1.1.0',
      'gulp-rename@1.4.0',
      'gulp-responsive@2.11.0',
      'gulp-rev-all@1.0.0',
      'gulp-util@3.0.8',
      'gulp-watch@5.0.1',
      'html-webpack-plugin@3.2.0',
      'imports-loader@0.8.0',
      'lodash@4.17.10',
      'marked@0.5.0',
      'ngrok@3.0.1',
      'node-env-file@0.1.8',
      'node-sass@4.9.3',
      'nodemon@1.18.4',
      'nunjucks@3.1.3',
      'open@0.0.5',
      'optimize-css-assets-webpack-plugin@3.2.0',
      'politico-style@3.0.2',
      'portfinder@1.0.17',
      'postcss-loader@3.0.0',
      'run-sequence@2.2.1',
      'sass-loader@7.1.0',
      'secure-keys@1.0.0',
      'style-loader@0.23.0',
      'uglify-es@3.3.9',
      'uglifyjs-webpack-plugin@1.1.8',
      'webpack@3.10.0',
      'webpack-dev-middleware@2.0.6',
      'webpack-hot-middleware@2.22.3',
      'webpack-stream@4.0.3',
      'whatwg-fetch@2.0.4',
      'yargs@12.0.1',
    ];

    if (this.options.nunjucks) {
      dependencies.push('');
    }
    this.yarnInstall(dependencies, { save: true, dev: true });
  }
};
