const Generator = require('yeoman-generator');
const S = require('string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('title', {
      type: String,
      required: true,
      desc: 'Project title',
    });
  }

  writing() {
    this.title = this.options.title;
    this.slug = S(this.title).slugify().s;

    const timestamp = new Date();
    const publishPath = `interactives/${timestamp.getFullYear()}/${this.slug}/`;
    const prodUrl = `https://www.politico.com/${publishPath}`;
    const stagingUrl = `https://s3.amazonaws.com/staging.interactives.politico.com/${publishPath}index.html`;

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));

    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'));

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        slug: this.slug,
        userName: this.user.git.name(),
        userEmail: this.user.git.email(),
      });

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        slug: this.slug,
        title: this.title,
        userName: this.user.git.name(),
        userEmail: this.user.git.email(),
        url: prodUrl,
        year: timestamp.getFullYear(),
      });

    const metaJSON = {
      id: (Math.floor(Math.random() * 100000000000) + 1).toString(),
      publishPath,
      stagingUrl,
      url: prodUrl,
      timestamp: '2017-04-13T08:13-0400',
      dateline: '04/13/17 08:13 PM EDT',
      share: {
        fbook: {
          card_title: this.title,
          card_description: 'The latest news from POLITICO.',
          author: 'politico',
        },
        twitter: {
          card_title: this.title,
          share_tweet: 'The latest news from POLITICO.',
          card_description: 'The latest news from POLITICO.',
          author: '@politico',
        },
        image: {
          url: `${prodUrl}images/share.jpg`,
          alt: '<Text>',
          type: 'image/jpeg',
          width: '600',
          height: '300',
        },
        keywords: 'POLITICO, News, Washington D.C.',
      },
      telium: {
        free_paid_content: 'free',
        site_section: 'white house',
        ad_unit_section: 'whitehouse',
        content_author: 'Polly Politico|Peter Politico',
        content_byline: 'By Polly Politico and Peter Politico',
        page_name: `${this.title} — POLITICO`,
      },
    };

    this.fs.writeJSON('meta.json', metaJSON);
  }

};
