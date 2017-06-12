const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.CHOICE_AIRBNB = 'airbnb';
    this.CHOICE_ES6_RECOMMENDED = 'es6-recommended';
    this.CHOICE_NO_ESLINT = 'none';
  }

  prompting() {
    const prompts = [{
      type: 'list',
      name: 'lintProfile',
      choices: [{
        value: this.CHOICE_NO_ESLINT,
        name: `${chalk.bold('No thanks')} [skips ESLint installation altogether]`,
      }, {
        value: this.CHOICE_ES6_RECOMMENDED,
        name: `${chalk.bold('Recommended ES2015')} [encourages ES2015 syntax, but more forgiving]`,
      }, {
        value: this.CHOICE_AIRBNB,
        name: `${chalk.bold('Enforce ES2015')} [strict enforcement (airbnb)]`,
      }],
      message: 'Would you like to add an ESLint configuration for linting ES2015 javascript?',
      store: true,
      default: 0,
    }];

    return this.prompt(prompts).then((answers) => {
      this.lintProfile = answers.lintProfile;
    });
  }

  writing() {
    if (this.lintProfile === this.CHOICE_NO_ESLINT) return;

    const esLintConfig = {
      root: true,
      parser: 'babel-eslint',
      env: {
        browser: true,
      },
      rules: {
        'no-console': 0,
      },
    };

    switch (this.lintProfile) {
      case (this.CHOICE_AIRBNB):
        Object.assign(esLintConfig, {
          extends: 'airbnb',
        });
        break;
      case (this.CHOICE_ES6_RECOMMENDED):
        Object.assign(esLintConfig, {
          extends: 'eslint:recommended',
          plugins: ['es6-recommended'],
        });
        break;
      default:
    }

    this.fs.writeJSON('./src/.eslintrc.json', esLintConfig);
  }

  install() {
    if (this.lintProfile === this.CHOICE_NO_ESLINT) return;

    const dependencies = [
      'eslint',
      'babel-eslint',
    ];

    switch (this.lintProfile) {
      case this.CHOICE_AIRBNB:
        dependencies.push(
          'eslint-plugin-import',
          'eslint-plugin-react',
          'eslint-plugin-jsx-a11y',
          'eslint-config-airbnb');
        break;
      case this.CHOICE_ES6_RECOMMENDED:
        dependencies.push('eslint-plugin-es6-recommended');
        break;
      default:
    }

    this.yarnInstall(dependencies, { save: true });
  }
};
