Building an interactive
=======================


Working with templates
----------------------

Templates are rendered using Nunjucks templating syntax. See Nunjucks' `template inheritance <https://mozilla.github.io/nunjucks/templating.html#template-inheritance>`_, `tags <https://mozilla.github.io/nunjucks/templating.html#tags>`_ and `builtin filters <https://mozilla.github.io/nunjucks/templating.html#builtin-filters>`_ for details on using the syntax to its full effect.

Template context
''''''''''''''''

You can put data in :code:`templates/data.json` and it will be rendered as context with your templates.

For example:

.. code-block:: javascript

  { "headline": "My headline" }

.. code-block:: html+jinja

  <h1>{{headline}}</h1>

Markdown
''''''''

There is a custom filter included for rendering template context formatted in `Markdown <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>`_:

.. code-block:: html+jinja

  <!-- Render context data with markdown -->
  {{someText|markdown}}

  <!-- Remove the outer paragraph tags with the strip option -->
  <h1>{{sectionTitle|markdown(strip=true)}}</h1>


Responsive images
-----------------

To make responsive images that load more quickly on smaller devices, drop a high-res jpg image into the :code:`src/images` directory, the run the :code:`img` task.

::

  $ gulp img

This is will create four optimized images from your source at 400, 800, 1200 and 1600 pixels width.

srcset macro
''''''''''''

You can easily include these images in your template with our custom :code:`jpg` nunjucks macro.

.. code-block:: html+jinja

  <figure>
      {{ jpg('cat', alt='A cat!') }}
      <figcaption>A pretty cat</figcaption>
  </figure>

Renders as:

.. code-block:: html

  <figure>
      <img src="images/cat-1800.jpg" srcset="images/cat-400.jpg 400w, images/cat-800.jpg 800w, images/cat-1200.jpg 1200w, images/cat-1800.jpg 1800w" alt="A cat!">
      <figcaption>A pretty cat</figcaption>
  </figure>


ArchieML
--------

Optionally, there is a gulp task available which allows you to use `ArchieML <http://archieml.org/#demo>`_ and Google Docs to render content into your templates.

You will be asked if you want to use ArchieML when you start the generator. You can also add it to a project later by running:

::

  $ yo politico-interactives:archie


You will need to provide the ID for the Google doc you wish to use, which you can get from the URL of your doc:

https://docs.google.com/document/d/**yourGoogleIDhere**/edit

.. note::

  Your document must have access set at least to :code:`Anyone with the link can view` to use this task.


The archie gulp task will access your Google doc and overwrite :code:`templates/data.json` with ArchieML data. To run it:

::

  $ gulp archie


.. note::

  On first running the task, you will need to authorize access to the document through Google. The task will open the authorization dialogue in your browser. Follow the prompts and then copy and paste the code returned by Google.

  This access token will be saved in :code:`archie-token.json` so that you can run the task subsequently without needing to re-authorize.

.. note::

    If you've added ArchieML after the project was already created, you'll also need to add the task to your gulpfile. Simply edit it into the array of other tasks in :code:`gulpfile.js`:

    .. code-block:: javascript

      const gulp = require('./gulp')([
        'aws',
        'archie', // Add this line
        // ...
      ]);
