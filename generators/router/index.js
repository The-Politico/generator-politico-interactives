const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('context', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use context building',
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('server/router.js'),
      this.destinationPath('server/router.js'),
      {
        context: this.options.context,
      });
  }
};
