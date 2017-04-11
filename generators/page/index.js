const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('title', {
      type: String,
      required: true,
      desc: 'Title of project',
    });
  }

  prompting() {
    const questions = [{
      type: 'input',
      name: 'projectTitle',
      message: 'OK, let\'s make an interactive page!\n What do we call it?',
    }, {
      type: 'list',
      name: 'bundler',
      message: 'Which Javascript bundler would you like to use?',
      default: 'browserify',
      choices: [
        {
          name: 'Browserify (default)',
          value: 'browserify',
        },
        {
          name: 'Webpack (ES2015)',
          value: 'webpack',
        },
      ],
    }];

    return this.prompt(questions).then((answers) => {
      this.bundler = answers.bundler;
      this.projectTitle = answers.projectTitle;
    });
  }
  writing() {
    // Nunjucks templates
    this.fs.copyTpl(
      this.templatePath('src/templates/index.html'),
      this.destinationPath('src/templates/index.html'),
      { title: this.projectTitle });
    this.fs.copyTpl(
      this.templatePath('src/templates/base.html'),
      this.destinationPath('src/templates/base.html'),
      {
        cssInclude: this.bundler === 'browserify',
        jsInclude: this.bundler === 'browserify',
      });
    // SCSS files
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_colors.scss'),
      this.destinationPath('src/scss/_colors.scss'));
    // Images directory
    mkdirp('./src/images');
    mkdirp('./src/images/opt');
  }
};
