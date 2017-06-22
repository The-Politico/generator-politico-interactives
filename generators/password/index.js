const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      type: 'password',
      name: 'password',
      message: 'Enter your passphrase:',
    }];

    return this.prompt(questions).then((answers) => {
      this.password = answers.password;
    });
  }

  writing() {
    this.fs.write(
      this.destinationPath('.env'), `PASSWORD=${this.password}`);
    this.composeWith(require.resolve('../keys'), {
      password: this.password,
    });
  }
};
