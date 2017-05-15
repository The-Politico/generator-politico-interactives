const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('src/scss/_ads.scss'),
      this.destinationPath('src/scss/_ads.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_bootstrap.scss'),
      this.destinationPath('src/scss/_bootstrap.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_breakpoints.scss'),
      this.destinationPath('src/scss/_breakpoints.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_colors.scss'),
      this.destinationPath('src/scss/_colors.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_comments.scss'),
      this.destinationPath('src/scss/_comments.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_elements.scss'),
      this.destinationPath('src/scss/_elements.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_fonts.scss'),
      this.destinationPath('src/scss/_fonts.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_footer.scss'),
      this.destinationPath('src/scss/_footer.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_header.scss'),
      this.destinationPath('src/scss/_header.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_icons.scss'),
      this.destinationPath('src/scss/_icons.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_mixins.scss'),
      this.destinationPath('src/scss/_mixins.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_navigation.scss'),
      this.destinationPath('src/scss/_navigation.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_photos.scss'),
      this.destinationPath('src/scss/_photos.scss'));
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
  }
  install() {
    const dependencies = [
      'bootstrap-sass',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
};
