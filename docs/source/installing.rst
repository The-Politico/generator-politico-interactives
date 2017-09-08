Installing the generator
========================

Dependencies
------------

Make sure you have the latest version of `node <https://docs.npmjs.com/getting-started/installing-node>`_ installed on your machine as well as the `yarn <https://yarnpkg.com/en/docs/install>`_ package manager.

NPM
---

Install the package's dependencies globally.

::

  $ npm install -g gulp-cli yo generator-politico-interactives

To use the Google Spreadsheet integration, you will need gdrive and its authentication setup.

::
  
  $ brew install gdrive

  $ gdrive list



Symlink
-------

Alternatively, you can clone a copy of the generator's git repository and use a symlink to install the package. This is especially useful if you'll be developing templates within the generator.

::

  $ git clone git@github.com:The-Politico/generator-politico-interactives.git

  $ cd generator-politico-interactives

  $ npm link


.. note::

  To update a symlinked package, just :code:`git pull` the latest changes in the symlinked directory.
