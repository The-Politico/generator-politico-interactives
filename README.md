![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# generator-politico-interactives [![npm](https://img.shields.io/npm/v/generator-politico-interactives.svg)](https://www.npmjs.com/package/generator-politico-interactives)

A [Yeoman](http://yeoman.io) generator to scaffold a development environment for building POLITICO interactives.

### What it does:

- Scaffolds your project's development directory.
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


## How to use

### Starting a new project

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

### Publishing a project

When you're ready to publish, complete the information in `meta.json`, then run the publish command through gulp.

```bash
$ gulp publish
```

If you need to invalidate files you've previously published in CloudFront, add the `--invalidate` flag to the `publish` command:

```bash
$ gulp publish --invalidate
```

Your dist folder will be synced to the directory specified under `publishPath` in `meta.json`, which means files in AWS at that location that are _not_ in your dist directory will be **deleted**. The publish task will also version and gzip CSS and JS assets.

### Restarting a project

1. Clone the project from github and `cd` into the project folder.
2. Create a new `.env` file with your passphrase:
  ```bash
  $ yo politico-interactives:passphrase
  ```
3. Install dependencies:
    ```bash
    $ yarn
    ```
4. If your project is using ArchieML, run the archie subtask to reconfigure the integration:
    ```bash
    $ yo politico-interactives:archie
    ```

### Using a project as a template

If you're cloning a project as a template for starting a new project, delete the `.git` folder in your project root and then initialize a new git repo for the new project.

```base
$ git init
```

### Working with templates

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

### Responsive images

To make responsive images that load more quickly on smaller devices, drop a high-res jpg image into `src/images` directory. Then run:

```bash
$ gulp img
```

This is will create four optimized images from your source at 400, 800, 1200 and 1600 pixels width.

You can easily include these images in your template with our custom `jpg` nunjucks macro. For example:

```html
<figure>
    {{ jpg('cat', alt='A cat!') }}
    <figcaption>A pretty cat</figcaption>
</figure>
```

... will render as ...

```html
<figure>
    <img src="images/cat-1800.jpg" srcset="images/cat-400.jpg 400w, images/cat-800.jpg 800w, images/cat-1200.jpg 1200w, images/cat-1800.jpg 1800w" alt="A cat!">
    <figcaption>A pretty cat</figcaption>
</figure>
```

### ArchieML

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

This access token will be saved in `archie-token.json` so that you can run the task subsequently without needing to re-authorize.

**Note:** If you've added ArchieML after the project was already created, you'll also need to add the task to your gulpfile. Simply edit it into the array of other tasks in `gulpfile.js`:

```javascript
const gulp = require('./gulp')([
  'aws',
  'archie', // Add this line
  // ...
]);
```

## Developing

To develop, clone this repository to a directory on your local computer. Move into the folder and run:

```bash
$ npm link
```

This lets you use your local copy of the generator whenever you run `yo politico-interactives`, which lets you test any changes you make to the generator.

**Always test your changes by running them locally _before_ publishing to github or npm.**

#### For designers

To change styles, simply update the scss files in the following directory within this generator

- `generators/styles/templates/src/scss/`

If you need to add a new SCSS file, ask a developer to help you write the line that loads your new file into a user's development directory.

If you need to make changes to HTML templates, they are here:

- `generators/templates/src/templates`

Again, if you need to add a new HTML file, rather than simply change an old one, talk to a developer.

#### Publishing

Once you're satisfied with your changes and have tested your update, publish your updates through the following steps:
1. Increment the version number in `package.json`, e.g., `0.0.3` --> `0.0.4`
2. Commit your changes to github
3. Run:
    ```bash
    $ npm publish
    ```
4. Update changelog (using [changelog](https://www.npmjs.com/package/changelog)):
    ```bash
    $ changelog generator-politico-interactives all > CHANGELOG.md
    ```


#### For developers

See the [development docs](DEVELOPING.md) and the [CHANGELOG](CHANGELOG.md).
