# generator-politico-interactives [![NPM version][npm-image]][npm-url]

A [Yeoman](http://yeoman.io) generator to scaffold a development environment for building Politico interactives.

### What it does:

- Scaffolds your project's development directory, shortcutting setup time.
- Compiles SCSS and bundles JS written in either ES6 or ES5.
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
