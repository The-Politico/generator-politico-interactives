const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      name: 'awsAccessKey',
      message: 'What\'s your AWS access key?',
      store: true,
    }, {
      name: 'awsSecretKey',
      message: 'What\'s your AWS secret key?',
      store: true,
    }];

    return this.prompt(questions).then((answers) => {
      this.awsAccessKey = answers.awsAccessKey;
      this.awsSecretKey = answers.awsSecretKey;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('aws.json.example'),
      this.destinationPath('aws.json.example'));

    const awsJSON = {
      accessKeyId: this.awsAccessKey,
      secretAccessKey: this.awsSecretKey,
      params: {
        Bucket: 'com.politico.interactives.politico.com',
        CloudFront: 'E3V6OHE700RHMR',
      },
    };

    this.fs.writeJSON('aws.json', awsJSON);
  }
};
