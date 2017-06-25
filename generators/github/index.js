const Generator = require('yeoman-generator');
const GitHubApi = require('github');
const git = require('simple-git');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const SecureKeys = require('secure-keys');
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

  prompting() {
    const prompts = [{
      name: 'create',
      type: 'confirm',
      message: 'Would you like to create a github repository for this project?',
    }, {
      name: 'repo',
      message: 'Great! What\'s your repo name?',
      when: a => a.create,
    }];

    return this.prompt(prompts).then((answers) => {
      this.answers = answers;
    });
  }

  validateKeys() {
    this.secure = new SecureKeys({ secret: this.options.passphrase });
    this.keyPath = path.join(os.homedir(), '.politico/interactives.json');

    try {
      const keysObj = fs.readJsonSync(this.keyPath);
      this.githubToken = this.secure.decrypt(keysObj).githubToken;
      return true;
    } catch (e) {
      return false;
    }
  }

  writing() {
    if (!this.answers.create) return;
    // Keys don't exist
    if (!this.validateKeys()) {
      this.log(
        chalk.bgRed('GitHub error:'),
        'Couldn\'t find GitHub token in your keys.');
      return;
    }

    const root = this.destinationRoot();
    const github = new GitHubApi();

    github.authenticate({
      type: 'token',
      token: this.githubToken,
    });

    try {
      github.repos.createForOrg({
        org: 'The-Politico',
        name: this.answers.repo,
        private: true,
      }).then((p) => {
        // After creating a GitHub repo,
        // create a local repo and add remote.
        const sshUrl = p.data.ssh_url;
        // Also p.data.svn_url to link...
        git(root)
          .init()
          .addRemote('origin', sshUrl);
      });
    } catch (e) {
      this.log(
        chalk.bgRed('GitHub error:'),
        'Couldn\'t create a repo named',
        chalk.yellow(this.answers.repo));
    }
  }
};
