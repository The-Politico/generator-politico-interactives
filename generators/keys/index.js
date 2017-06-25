const Generator = require('yeoman-generator');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const SecureKeys = require('secure-keys');
const mkdirp = require('mkdirp');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('passphrase', {
      type: String,
      required: true,
      desc: 'Secure keys passphrase',
    });
  }

  validateKeys() {
    this.secure = new SecureKeys({ secret: this.options.passphrase });
    this.keyPath = path.join(os.homedir(), '.politico/interactives.json');

    try {
      const keysObj = fs.readJsonSync(this.keyPath);
      this.secure.decrypt(keysObj);
      return true;
    } catch (e) {
      return false;
    }
  }

  prompting() {
    this.validKeys = this.validateKeys();

    const questions = [{
      name: 'write',
      type: 'confirm',
      message: 'Couldn\'t validate your keys with your passphrase. Should we write a new set?',
    }, {
      name: 'awsAccessKey',
      message: 'OK. What\'s your AWS access key?',
      when: a => a.write,
    }, {
      name: 'awsSecretKey',
      message: 'What\'s your AWS secret key?',
      when: a => a.write,
    }, {
      name: 'googleClientId',
      message: 'What\'s your Google client ID?',
      when: a => a.write,
    }, {
      name: 'googleClientSecret',
      message: 'What\'s your Google client secret key?',
      when: a => a.write,
    }, {
      name: 'githubToken',
      message: 'What\'s your Github token?',
      when: a => a.write,
    }, {
      name: 'slackToken',
      message: 'What\'s your Slack API token?',
      when: a => a.write,
    }, {
      name: 'ngrokToken',
      message: 'What\'s your ngrok token?',
      when: a => a.write,
    }];

    return this.validKeys ? null :
      this.prompt(questions).then((answers) => {
        this.answers = answers;
      });
  }

  writing() {
    if (this.validKeys || !this.answers.write) return;

    mkdirp(path.join(os.homedir(), '.politico/'));

    fs.writeJsonSync(this.keyPath, this.secure.encrypt({
      awsAccessKey: this.answers.awsAccessKey,
      awsSecretKey: this.answers.awsSecretKey,
      googleClientId: this.answers.googleClientId,
      googleClientSecret: this.answers.googleClientSecret,
      githubToken: this.answers.githubToken,
      slackToken: this.answers.slackToken,
      ngrokToken: this.answers.ngrokToken,
    }));
  }

  end() {
    if (this.validKeys || !this.answers.write) return;
    this.log(
      'New keys encrypted and saved to',
      chalk.yellow('~/.politico/interactives.json.'));
  }
};
