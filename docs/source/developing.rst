Developing
==========

Subgenerators
-------------

The generator is split into several subgenerators which are called in sequence  (and may be called by other generators). Read up on `generator composability <http://yeoman.io/authoring/composability.html>`_. These can be called individually:

::

  $ yo politico-interactives:<subgenerator>

app
'''

The main subgenerator called by defauly when you run the generator.

archie
''''''

Sets up an ArchieML integration for the project, if requested.


bundler-webpack
'''''''''''''''

Sets up a webpack-based bundler system.

github
''''''

Generates a GitHub repository for the project, if requested.

gulp-common
'''''''''''

Common gulp tasks shared across our generators.

gulp-statics
''''''''''''

Gulp tasks for building static assets beyond JS and CSS (i.e. Nunjucks templates, image processing).

keys
''''

Will write a set of keys encrypted with a passphrase to a path in the user's directory, ``~/.politico/interactives.json``. Writes the following keys:

- AWS access key
- AWS secret key
- Google client ID
- Google client secret key
- GitHub personal access token
- Slack token
- Ngrok token

linters
'''''''

Sets up ESLint linter config.

meta
''''

Writes meta file.

new-page
''''''''

Generates a new page in your templates folder.

passphrase
''''''''''

Uses your passphrase to try to decrypt keys file.

router
''''''

Router file for Express server.

spreadsheet
''''''''''

Sets up gulp tasks and context loading for using a Google Spreadsheet

styles
''''''

Writes scss directory.

templates
'''''''''

Writes HTML directories.
