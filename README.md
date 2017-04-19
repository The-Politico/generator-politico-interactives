![Politico][logo]

# generator-politico-interactives [![npm version](https://badge.fury.io/js/generator-politico-interactives.svg)](https://badge.fury.io/js/generator-politico-interactives)



A [Yeoman](http://yeoman.io) generator to scaffold a development environment for building Politico interactives.

### What it does:

- Scaffolds your project's development directory, either for an embeddable feature or a complete interactive page.
- Compiles SCSS and bundles JS written in either ES5 or ES2015 using your choice of browserify or webpack.
- Creates responsive image sets optimized for mobile devices.
- Publishes your project to an Amazon S3 bucket.

### What you'll need installed

Make sure you have [node](https://docs.npmjs.com/getting-started/installing-node) installed as well as the [yarn](https://yarnpkg.com/en/docs/install) package manager.

Then install [gulp](http://gulpjs.com/), [yeoman](http://yeoman.io/) and this generator, globally*:
```
$ npm install -g gulp-cli yo generator-politico-interactives
```
_\* You may need to prefix with `sudo`_


### How to use

#### Starting a new project

Create a fresh directory for your project and move into it in your console.

```bash
$ mkdir my-project
$ cd my-project
```

Now run the generator and answer the questions it asks to build your dev environment.

```bash
$ yo politico-interactives
```

Run gulp to start the development server.

```bash
$ gulp
```

Develop files in the `src` directory and they will be automatically compiled to the `dist` directory, which are the files that will actually be published.

When you're ready to publish, run the publish command through gulp.

```bash
$ gulp publish
```

#### Restarting a project

1. Clone the project from github and `cd` into the project folder.
2. Install dependencies:
    ```bash
    $ yarn install
    ```
3. Create a new `aws.json` using `aws.json.example`.
4. If your project is using ArchieML, run `gulp archie` to reconfigure :
    ```bash
    $ gulp archie
    ```
5. Start `gulp`!

#### Working with templates

Templates are rendered using Nunjucks templating syntax. See Nunjucks' [template inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance), [tags](https://mozilla.github.io/nunjucks/templating.html#tags) and [builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters) for more information.

Put data in `templates/data.json` and it will be rendered as context with your templates. For example:

```javascript
// templates/data.json
{
  "headline": "My headline"
}
```

```html
<!-- A template -->
<h1>{{headline}}</h1>
```

There is also an extra filter specifically for rendering [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet):

```html
<!-- Render context data with markdown -->
{{someText|markdown}}
<!-- Remove the outer paragraph tags with strip option -->
<h1>{{sectionTitle|markdown(strip=true)}}</h1>
```

#### ArchieML

Optionally, there is a gulp task available which allows you to use [ArchieML](http://archieml.org/#demo) and Google Docs to render content into your templates.

You will be asked if you want to use ArchieML when you start the generator. You can also add it to a project later by running:

```bash
$ yo politico-interactives:archie
```

To setup the ArchieML task you will need API credentials from a project in the [Google Developers Console](https://console.developers.google.com). Ask a developer for the client ID and secret keys. You will also need to provide the ID for the Google doc you wish to use, which you can get from the URL of your doc:

https<nolink>://docs.google.com/document/d/**yourgoogleIDhere**/edit

These credentials are put into `archie.json`, which you can change at any time.

Your document **must have access set to "Anyone with the link can view" to use this task.**

The archie gulp task will access your Google doc and overwrite `templates/data.json` with ArchieML data. To run it:

```bash
$ gulp archie
```

On first running the task, you will need to authorize access to the document through Google. The task will open the authorization dialogue in your browser. Follow the prompts and then copy and paste the code returned in the redirect URL, which will look like this in the URL bar:

http<nolink>://localhost:6006/?code=**COPY-THIS-CODE-HERE**

This access token will be saved in `google-token.json` so that you can run the task subsequently without needing to re-authorize.

**Note:** If you've added ArchieML after the project was already created, you'll also need to add the task to your gulpfile. Simply edit it into the array of other tasks in `gulpfile.js`:

```javascript
const gulp = require('./gulp')([
  'aws',
  'archie', // Add this line
  // ...
]);
```

## Developing

To develop, clone this repository and use `npm link` to test changes locally before publishing updates.

#### For designers

To change styles, simply update the scss files in the following directory within this generator

- `generators/styles/templates/src/scss/`

Make sure you've run the generator locally to check that your changes carried through.

Once you're satisfied with your changes, publish via the following:
- increment the version number in `package.json`
- commit the repo to github
- run `npm publish`

To change an HTML template, check with a developer.

#### For developers

See [development docs](DEVELOPING.md).

[logo]: logo.png "Logo"
