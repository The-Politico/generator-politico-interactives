Why this
========

At POLITICO we sometimes build custom webpages outside our CMS to showcase a special visual presentation or nonlinear story. We call these pages **interactives**, which is a metonym for pages that offer our readers a richer experience with our content.

This app helps us build those pages.

At its simplest, this app is a `Yeoman generator <http://yeoman.io/>`_, which means it simply sets up folders and files in a directory on a developer's computer. But its real value is those files, which include a complete build and publishing system for our interactives and enforce our house styles and conventions through templates.

The rest of these docs describe how to work with the build system contained within this generator.


Principles
----------

The build system creates projects that are...

Decentralized
'''''''''''''

Every project is an independent application. This keeps our builds lean. It gives us the flexibility to use whatever front-end technology we need for the project at hand and to integrate easily with backends in a decoupled way.

Treating our projects as independent apps means we intentionally skip several conventions that are normally part of content management systems, like centralized revision control and release management.


Batteries included
''''''''''''''''''

An app's development environment is built from the command line with a complete set of templates and scripts to build and publish the project, all of which can be overwritten within an individual project.



What it does
------------

- Scaffolds your project's development directory.
- Compiles SCSS and bundles JS written in either ES5 or ES2015 using your choice of browserify or webpack.
- Renders HTML templates with custom context.
- Creates responsive image sets optimized for mobile devices.
- Publishes your project to an Amazon S3 bucket.

What's in it
------------

The build pipeline uses:

- `Gulp <http://gulpjs.com/>`_ to run tasks
- `Babel <https://babeljs.io/>`_ to transpile ES6 Javascript
- `Webpack <https://webpack.js.org//>`_ to bundle scripts
- `Express <https://expressjs.com/>`_ to serve your work in development
- `node-sass <https://github.com/sass/node-sass>`_ to compile SCSS
- `Sharp <http://sharp.dimens.io/en/stable/>`_ for image processing
- `ESLint <http://eslint.org/>`_ for syntax highlighting
- `Nunjucks <https://mozilla.github.io/nunjucks/>`_ to compile HTML templates
- `ArchieML <http://archieml.org/>`_ & `archieml-pipe <https://www.npmjs.com/package/archieml-pipe>`_ to use Google docs to create template context
- `secure-keys <https://www.npmjs.com/package/secure-keys>`_ to encrypt and decrypt your access keys to AWS, GitHub and other services
- `ngrok <https://ngrok.com/>`_ to share preview pages
- `gulp-awspublish <https://www.npmjs.com/package/gulp-awspublish>`_ to publish to AWS
