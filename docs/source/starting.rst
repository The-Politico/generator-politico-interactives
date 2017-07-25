Starting an interactive
=======================

From scratch
------------

1. Create a fresh directory for your project and move into it in your terminal.

  ::

    $ mkdir my-project
    $ cd my-project

2. Now run the generator and answer the questions it asks to build your development environment.

  ::

    $ yo politico-interactives

3. Once the generator finishes, you can simply run gulp to start the development server.

  ::

    $ gulp

From GitHub
-----------

1. Clone the project and :code:`cd` into the project directory.
2. Run the passphrase subgenerator to create a new :code:`.env` file:

  ::

    $ yo politico-interactives:passphrase

3. Install dependencies.

  ::

    $ yarn

4. If your project is using `ArhcieML <http://archieml.org>`_, run the archie subgenerator to reconfigure the integration.

  ::

    $ yo politico-interactives:archie

.. note::

  If you're cloning a project to use as a template for a new project, delete the :code:`.git` folder in your project root and then initialize a new git repo for the new project.

  ::

    $ rm -rf .git
    $ git init
